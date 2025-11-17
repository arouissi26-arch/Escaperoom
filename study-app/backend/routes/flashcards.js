import express from 'express';
import db from '../config/database.js';
import { generateFlashcards } from '../services/gemini.js';

const router = express.Router();

// Obtener flashcards de un documento
router.get('/document/:documentId', (req, res) => {
  const { status } = req.query;

  let query = `
    SELECT * FROM flashcards
    WHERE document_id = ?
  `;

  const params = [req.params.documentId];

  if (status) {
    query += ` AND status = ?`;
    params.push(status);
  }

  query += ` ORDER BY created_at DESC`;

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Generar flashcards
router.post('/generate', async (req, res) => {
  try {
    const { documentId, language } = req.body;

    if (!documentId || !language) {
      return res.status(400).json({
        error: 'Faltan parámetros requeridos: documentId, language'
      });
    }

    // Validar idioma
    if (!['ca', 'es'].includes(language)) {
      return res.status(400).json({
        error: 'Idioma inválido. Debe ser: ca o es'
      });
    }

    // Obtener texto del documento
    db.get(
      'SELECT extracted_text FROM documents WHERE id = ?',
      [documentId],
      async (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!row) {
          return res.status(404).json({ error: 'Documento no encontrado' });
        }

        try {
          // Generar flashcards con Gemini
          const flashcardData = await generateFlashcards(row.extracted_text, language);

          // Insertar flashcards en base de datos
          const stmt = db.prepare(`
            INSERT INTO flashcards (document_id, front, back)
            VALUES (?, ?, ?)
          `);

          const insertedIds = [];

          for (const card of flashcardData.flashcards) {
            stmt.run([documentId, card.front, card.back], function(err) {
              if (!err) {
                insertedIds.push(this.lastID);
              }
            });
          }

          stmt.finalize((err) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            // Obtener flashcards creadas
            const placeholders = insertedIds.map(() => '?').join(',');
            db.all(
              `SELECT * FROM flashcards WHERE id IN (${placeholders})`,
              insertedIds,
              (err, rows) => {
                if (err) {
                  return res.status(500).json({ error: err.message });
                }
                res.json(rows);
              }
            );
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar estado de flashcard (algoritmo de repetición espaciada)
router.put('/:id/review', (req, res) => {
  const { quality } = req.body; // 0-5: 0 = no me acuerdo, 5 = muy fácil

  if (quality === undefined || quality < 0 || quality > 5) {
    return res.status(400).json({
      error: 'El parámetro quality debe estar entre 0 y 5'
    });
  }

  // Obtener flashcard actual
  db.get('SELECT * FROM flashcards WHERE id = ?', [req.params.id], (err, card) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!card) {
      return res.status(404).json({ error: 'Flashcard no encontrada' });
    }

    // Algoritmo SM-2 simplificado
    let { ease_factor, interval, repetitions } = card;

    if (quality >= 3) {
      // Respuesta correcta
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * ease_factor);
      }
      repetitions += 1;
      ease_factor = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    } else {
      // Respuesta incorrecta
      repetitions = 0;
      interval = 1;
    }

    // Asegurar que ease_factor no sea menor a 1.3
    if (ease_factor < 1.3) {
      ease_factor = 1.3;
    }

    // Calcular próxima revisión
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    // Determinar estado
    const status = quality >= 4 ? 'known' : 'review';

    // Actualizar flashcard
    const query = `
      UPDATE flashcards
      SET ease_factor = ?, interval = ?, repetitions = ?, next_review = ?, status = ?
      WHERE id = ?
    `;

    db.run(
      query,
      [ease_factor, interval, repetitions, nextReview.toISOString(), status, req.params.id],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Actualizar última vez estudiado del documento
        db.run(
          `UPDATE documents
           SET last_studied = CURRENT_TIMESTAMP
           WHERE id = ?`,
          [card.document_id]
        );

        // Obtener flashcard actualizada
        db.get('SELECT * FROM flashcards WHERE id = ?', [req.params.id], (err, updated) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json(updated);
        });
      }
    );
  });
});

// Eliminar flashcard
router.delete('/:id', (req, res) => {
  const query = `DELETE FROM flashcards WHERE id = ?`;

  db.run(query, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Flashcard no encontrada' });
    }
    res.json({ message: 'Flashcard eliminada' });
  });
});

// Resetear progreso de flashcard
router.put('/:id/reset', (req, res) => {
  const query = `
    UPDATE flashcards
    SET status = 'review', repetitions = 0, ease_factor = 2.5, interval = 0, next_review = NULL
    WHERE id = ?
  `;

  db.run(query, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Flashcard no encontrada' });
    }
    res.json({ message: 'Progreso reseteado' });
  });
});

export default router;
