import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'study-app.db');
const db = new sqlite3.Database(dbPath);

export const initDatabase = () => {
  db.serialize(() => {
    // Tabla de documentos
    db.run(`
      CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        filename TEXT NOT NULL,
        filepath TEXT NOT NULL,
        filetype TEXT NOT NULL,
        filesize INTEGER,
        subject TEXT,
        extracted_text TEXT,
        upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_studied DATETIME
      )
    `);

    // Tabla de resúmenes
    db.run(`
      CREATE TABLE IF NOT EXISTS summaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        document_id INTEGER,
        summary_text TEXT NOT NULL,
        summary_level TEXT NOT NULL,
        language TEXT NOT NULL,
        is_favorite BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
      )
    `);

    // Tabla de quizzes
    db.run(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        document_id INTEGER,
        questions TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        language TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
      )
    `);

    // Tabla de resultados de quizzes
    db.run(`
      CREATE TABLE IF NOT EXISTS quiz_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quiz_id INTEGER,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
      )
    `);

    // Tabla de flashcards
    db.run(`
      CREATE TABLE IF NOT EXISTS flashcards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        document_id INTEGER,
        front TEXT NOT NULL,
        back TEXT NOT NULL,
        status TEXT DEFAULT 'review',
        repetitions INTEGER DEFAULT 0,
        ease_factor REAL DEFAULT 2.5,
        interval INTEGER DEFAULT 0,
        next_review DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
      )
    `);

    // Tabla de caché de respuestas
    db.run(`
      CREATE TABLE IF NOT EXISTS response_cache (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cache_key TEXT UNIQUE NOT NULL,
        response TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Base de datos inicializada correctamente');
  });
};

export default db;
