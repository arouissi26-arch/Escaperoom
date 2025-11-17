import express from 'express';
import db from '../config/database.js';
import { generateQuiz } from '../services/gemini.js';

const router = express.Router();

// Obtener quizzes de un documento
router.get('/document/:documentId', (req, res) => {
  const query = `
    SELECT
      q.*,
      (SELECT COUNT(*) FROM quiz_results WHERE quiz_id = q.id) as attempt_count
    FROM quizzes q
    WHERE q.document_id = ?
    ORDER BY q.created_at DESC
  `;

  db.all(query, [req.params.documentId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Parsear JSON de preguntas
    const quizzes = rows.map(quiz => ({
      ...quiz,
      questions: JSON.parse(quiz.questions)
    }));
    res.json(quizzes);
  });
});

// Obtener un quiz por ID
router.get('/:id', (req, res) => {
  const query = `SELECT * FROM quizzes WHERE id = ?`;

  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Quiz no encontrado' });
    }

    // Parsear JSON de preguntas
    res.json({
      ...row,
      questions: JSON.parse(row.questions)
    });
  });
});

// Generar nuevo quiz
router.post('/generate', async (req, res) => {
  try {
    const { documentId, numQuestions, difficulty, language } = req.body;

    if (!documentId || !numQuestions || !difficulty || !language) {
      return res.status(400).json({
        error: 'Faltan parámetros requeridos: documentId, numQuestions, difficulty, language'
      });
    }

    // Validar número de preguntas
    const num = parseInt(numQuestions);
    if (num < 5 || num > 50) {
      return res.status(400).json({
        error: 'El número de preguntas debe estar entre 5 y 50'
      });
    }

    // Validar dificultad
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(400).json({
        error: 'Dificultad inválida. Debe ser: easy, medium o hard'
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
          // Generar quiz con Gemini
          const quizData = await generateQuiz(row.extracted_text, num, difficulty, language);

          // Guardar en base de datos
          const query = `
            INSERT INTO quizzes (document_id, questions, difficulty, language)
            VALUES (?, ?, ?, ?)
          `;

          db.run(
            query,
            [documentId, JSON.stringify(quizData.questions), difficulty, language],
            function(err) {
              if (err) {
                return res.status(500).json({ error: err.message });
              }

              // Obtener quiz creado
              db.get('SELECT * FROM quizzes WHERE id = ?', [this.lastID], (err, quiz) => {
                if (err) {
                  return res.status(500).json({ error: err.message });
                }
                res.json({
                  ...quiz,
                  questions: JSON.parse(quiz.questions)
                });
              });
            }
          );
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Guardar resultado de quiz
router.post('/:id/results', (req, res) => {
  const { score, totalQuestions } = req.body;

  if (score === undefined || !totalQuestions) {
    return res.status(400).json({
      error: 'Faltan parámetros requeridos: score, totalQuestions'
    });
  }

  const query = `
    INSERT INTO quiz_results (quiz_id, score, total_questions)
    VALUES (?, ?, ?)
  `;

  db.run(query, [req.params.id, score, totalQuestions], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Actualizar última vez estudiado del documento
    db.run(
      `UPDATE documents
       SET last_studied = CURRENT_TIMESTAMP
       WHERE id = (SELECT document_id FROM quizzes WHERE id = ?)`,
      [req.params.id]
    );

    res.json({
      id: this.lastID,
      message: 'Resultado guardado',
      percentage: Math.round((score / totalQuestions) * 100)
    });
  });
});

// Obtener resultados de un quiz
router.get('/:id/results', (req, res) => {
  const query = `
    SELECT * FROM quiz_results
    WHERE quiz_id = ?
    ORDER BY completed_at DESC
  `;

  db.all(query, [req.params.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Eliminar quiz
router.delete('/:id', (req, res) => {
  const query = `DELETE FROM quizzes WHERE id = ?`;

  db.run(query, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Quiz no encontrado' });
    }
    res.json({ message: 'Quiz eliminado' });
  });
});

export default router;
