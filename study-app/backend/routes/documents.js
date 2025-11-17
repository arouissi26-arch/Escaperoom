import express from 'express';
import upload from '../middleware/upload.js';
import db from '../config/database.js';
import { processFile, validateFile } from '../services/fileProcessor.js';
import fs from 'fs/promises';

const router = express.Router();

// Obtener todos los documentos
router.get('/', (req, res) => {
  const query = `
    SELECT
      d.*,
      COUNT(DISTINCT q.id) as quiz_count,
      COUNT(DISTINCT f.id) as flashcard_count
    FROM documents d
    LEFT JOIN quizzes q ON d.id = q.document_id
    LEFT JOIN flashcards f ON d.id = f.document_id
    GROUP BY d.id
    ORDER BY d.upload_date DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Obtener un documento por ID
router.get('/:id', (req, res) => {
  const query = `
    SELECT * FROM documents WHERE id = ?
  `;

  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }
    res.json(row);
  });
});

// Subir documento
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    // Validar archivo
    validateFile(req.file);

    // Extraer texto del archivo
    const extractedText = await processFile(req.file.path, req.file.mimetype);

    // Guardar en base de datos
    const title = req.body.title || req.file.originalname;
    const subject = req.body.subject || null;

    const query = `
      INSERT INTO documents (title, filename, filepath, filetype, filesize, subject, extracted_text)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [title, req.file.originalname, req.file.path, req.file.mimetype, req.file.size, subject, extractedText],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Obtener el documento recién creado
        db.get('SELECT * FROM documents WHERE id = ?', [this.lastID], (err, row) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({
            message: 'Documento subido y procesado correctamente',
            document: row
          });
        });
      }
    );
  } catch (error) {
    // Eliminar archivo si hay error
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    res.status(500).json({ error: error.message });
  }
});

// Actualizar documento
router.put('/:id', (req, res) => {
  const { title, subject } = req.body;
  const updates = [];
  const values = [];

  if (title) {
    updates.push('title = ?');
    values.push(title);
  }
  if (subject !== undefined) {
    updates.push('subject = ?');
    values.push(subject);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No hay campos para actualizar' });
  }

  values.push(req.params.id);

  const query = `UPDATE documents SET ${updates.join(', ')} WHERE id = ?`;

  db.run(query, values, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    // Obtener documento actualizado
    db.get('SELECT * FROM documents WHERE id = ?', [req.params.id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(row);
    });
  });
});

// Actualizar última vez estudiado
router.put('/:id/study', (req, res) => {
  const query = `UPDATE documents SET last_studied = CURRENT_TIMESTAMP WHERE id = ?`;

  db.run(query, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Fecha de estudio actualizada' });
  });
});

// Eliminar documento
router.delete('/:id', async (req, res) => {
  try {
    // Obtener información del documento
    db.get('SELECT * FROM documents WHERE id = ?', [req.params.id], async (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: 'Documento no encontrado' });
      }

      // Eliminar archivo físico
      await fs.unlink(row.filepath).catch(() => {});

      // Eliminar de base de datos
      db.run('DELETE FROM documents WHERE id = ?', [req.params.id], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Documento eliminado correctamente' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar documentos
router.get('/search/:query', (req, res) => {
  const searchQuery = `%${req.params.query}%`;

  const query = `
    SELECT * FROM documents
    WHERE title LIKE ? OR subject LIKE ?
    ORDER BY upload_date DESC
  `;

  db.all(query, [searchQuery, searchQuery], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

export default router;
