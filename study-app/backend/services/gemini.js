import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import db from '../config/database.js';
import crypto from 'crypto';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Generar clave de caché
const generateCacheKey = (prompt, params) => {
  const data = JSON.stringify({ prompt, params });
  return crypto.createHash('md5').update(data).digest('hex');
};

// Obtener respuesta del caché
const getCachedResponse = (cacheKey) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT response FROM response_cache WHERE cache_key = ?',
      [cacheKey],
      (err, row) => {
        if (err) reject(err);
        resolve(row ? row.response : null);
      }
    );
  });
};

// Guardar respuesta en caché
const cacheResponse = (cacheKey, response) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT OR REPLACE INTO response_cache (cache_key, response) VALUES (?, ?)',
      [cacheKey, response],
      (err) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
};

// Generar contenido con reintentos y caché
export const generateWithRetry = async (prompt, params = {}, maxRetries = 2) => {
  const cacheKey = generateCacheKey(prompt, params);

  // Verificar caché
  const cachedResponse = await getCachedResponse(cacheKey);
  if (cachedResponse) {
    console.log('✅ Respuesta obtenida del caché');
    return cachedResponse;
  }

  let lastError;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const result = await model.generateContent(prompt);
      const response = result.response.text();

      // Guardar en caché
      await cacheResponse(cacheKey, response);

      return response;
    } catch (error) {
      lastError = error;
      console.error(`❌ Intento ${i + 1} falló:`, error.message);
      if (i < maxRetries) {
        // Esperar antes de reintentar (backoff exponencial)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  }

  throw new Error(`No se pudo procesar después de ${maxRetries + 1} intentos: ${lastError.message}`);
};

// Generar resumen
export const generateSummary = async (text, level, language) => {
  const wordLimits = {
    short: 200,
    medium: 500,
    long: 1000
  };

  const levelNames = {
    ca: { short: 'curt', medium: 'mitjà', long: 'llarg' },
    es: { short: 'corto', medium: 'medio', long: 'largo' }
  };

  const lang = language === 'ca' ? 'català' : 'castellano';
  const levelName = levelNames[language][level];
  const wordLimit = wordLimits[level];

  const prompt = `Resume aquest contingut en ${lang}. Format de resum ${levelName} amb bullets organitzats per tema principal. Màxim ${wordLimit} paraules.

Contingut:
${text}

Instruccions:
- Organitza per temes principals amb bullets
- Usa llenguatge clar i concís
- Màxim ${wordLimit} paraules
- Respon NOMÉS en ${lang}`;

  return await generateWithRetry(prompt, { level, language });
};

// Generar quiz
export const generateQuiz = async (text, numQuestions, difficulty, language) => {
  const lang = language === 'ca' ? 'català' : 'castellano';

  const difficultyDescriptions = {
    ca: {
      easy: 'fàcil (conceptes bàsics i definicions)',
      medium: 'mitjà (relacions i aplicacions)',
      hard: 'difícil (anàlisi i síntesi)'
    },
    es: {
      easy: 'fácil (conceptos básicos y definiciones)',
      medium: 'medio (relaciones y aplicaciones)',
      hard: 'difícil (análisis y síntesis)'
    }
  };

  const prompt = `Genera ${numQuestions} preguntes tipus examen d'institut espanyol basades en aquest contingut.

Contingut:
${text}

Instruccions:
- Dificultat: ${difficultyDescriptions[language][difficulty]}
- Tipus de pregunta: Multi-opció amb 4 opcions (A, B, C, D)
- Una sola resposta correcta per pregunta
- Inclou explicació de la resposta correcta
- Respon en ${lang}
- Format JSON exacte:

{
  "questions": [
    {
      "question": "Pregunta aquí?",
      "options": {
        "A": "Opció A",
        "B": "Opció B",
        "C": "Opció C",
        "D": "Opció D"
      },
      "correct": "A",
      "explanation": "Explicació de per què A és correcta"
    }
  ]
}`;

  const response = await generateWithRetry(prompt, { numQuestions, difficulty, language });

  // Extraer JSON de la respuesta
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  throw new Error('No se pudo parsear el JSON de las preguntas');
};

// Generar flashcards
export const generateFlashcards = async (text, language) => {
  const lang = language === 'ca' ? 'català' : 'castellano';

  const prompt = `Genera flashcards d'estudi basades en aquest contingut.

Contingut:
${text}

Instruccions:
- Crea entre 10-20 flashcards
- Anvers: pregunta o concepte
- Revers: resposta o definició
- Respon en ${lang}
- Format JSON exacte:

{
  "flashcards": [
    {
      "front": "Pregunta o concepte?",
      "back": "Resposta o definició detallada"
    }
  ]
}`;

  const response = await generateWithRetry(prompt, { language });

  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  throw new Error('No se pudo parsear el JSON de las flashcards');
};

// Explicar concepto
export const explainConcept = async (text, concept, language) => {
  const lang = language === 'ca' ? 'català' : 'castellano';

  const prompt = `Explica el concepte "${concept}" basat en aquest contingut. Explica'l com si tingués 15 anys.

Contingut:
${text}

Instruccions:
- Definició simple i clara
- Exemple pràctic relacionat amb la vida quotidiana
- Analogia si el concepte és complex
- Relació amb altres conceptes del document (si n'hi ha)
- Respon en ${lang}
- Màxim 300 paraules`;

  return await generateWithRetry(prompt, { concept, language });
};
