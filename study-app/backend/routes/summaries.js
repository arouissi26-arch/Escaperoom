import express from 'express';
import db from '../config/database.js';
import { generateSummary } from '../services/gemini.js';

const router = express.Router();

// Obtener resúmenes de un documento
router.get('/document/:documentId', (req, res) => {
  const query = `
    SELECT * FROM summaries
    WHERE document_id = ?
    ORDER BY created_at DESC
  `;

  db.all(query, [req.params.documentId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Generar nuevo resumen
router.post('/generate', async (req, res) => {
  try {
    const { documentId, level, language } = req.body;

    if (!documentId || !level || !language) {
      return res.status(400).json({
        error: 'Faltan parámetros requeridos: documentId, level, language'
      });
    }

    // Validar nivel
    if (!['short', 'medium', 'long'].includes(level)) {
      return res.status(400).json({
        error: 'Nivel inválido. Debe ser: short, medium o long'
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
          // Generar resumen con Gemini
          const summaryText = await generateSummary(row.extracted_text, level, language);

          // Guardar en base de datos
          const query = `
            INSERT INTO summaries (document_id, summary_text, summary_level, language)
            VALUES (?, ?, ?, ?)
          `;

          db.run(query, [documentId, summaryText, level, language], function(err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            // Obtener resumen creado
            db.get('SELECT * FROM summaries WHERE id = ?', [this.lastID], (err, summary) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              res.json(summary);
            });
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

// Marcar resumen como favorito
router.put('/:id/favorite', (req, res) => {
  const { isFavorite } = req.body;

  const query = `
    UPDATE summaries SET is_favorite = ?
    WHERE id = ?
  `;

  db.run(query, [isFavorite ? 1 : 0, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Resumen no encontrado' });
    }
    res.json({ message: 'Favorito actualizado' });
  });
});

// Eliminar resumen
router.delete('/:id', (req, res) => {
  const query = `DELETE FROM summaries WHERE id = ?`;

  db.run(query, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Resumen no encontrado' });
    }
    res.json({ message: 'Resumen eliminado' });
  });
});

export default router;
