import express from 'express';
import db from '../config/database.js';
import { explainConcept } from '../services/gemini.js';

const router = express.Router();

// Explicar concepto
router.post('/', async (req, res) => {
  try {
    const { documentId, concept, language } = req.body;

    if (!documentId || !concept || !language) {
      return res.status(400).json({
        error: 'Faltan parámetros requeridos: documentId, concept, language'
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
          // Generar explicación con Gemini
          const explanation = await explainConcept(row.extracted_text, concept, language);

          // Actualizar última vez estudiado
          db.run(
            'UPDATE documents SET last_studied = CURRENT_TIMESTAMP WHERE id = ?',
            [documentId]
          );

          res.json({
            concept,
            explanation,
            language
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

// Buscar conceptos en el documento
router.post('/search', (req, res) => {
  const { documentId, searchTerm } = req.body;

  if (!documentId || !searchTerm) {
    return res.status(400).json({
      error: 'Faltan parámetros requeridos: documentId, searchTerm'
    });
  }

  db.get(
    'SELECT extracted_text FROM documents WHERE id = ?',
    [documentId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: 'Documento no encontrado' });
      }

      // Buscar término en el texto
      const text = row.extracted_text;
      const regex = new RegExp(`[^.!?]*${searchTerm}[^.!?]*[.!?]`, 'gi');
      const matches = text.match(regex);

      if (!matches) {
        return res.json({ found: false, matches: [] });
      }

      // Limitar a 5 resultados
      const results = matches.slice(0, 5).map(match => match.trim());

      res.json({
        found: true,
        matches: results,
        count: matches.length
      });
    }
  );
});

export default router;
