import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

// Procesar PDF
export const extractTextFromPDF = async (filepath) => {
  try {
    const dataBuffer = await fs.readFile(filepath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error(`Error al extraer texto del PDF: ${error.message}`);
  }
};

// Procesar DOCX
export const extractTextFromDOCX = async (filepath) => {
  try {
    const result = await mammoth.extractRawText({ path: filepath });
    return result.value;
  } catch (error) {
    throw new Error(`Error al extraer texto del DOCX: ${error.message}`);
  }
};

// Procesar imagen con OCR
export const extractTextFromImage = async (filepath) => {
  try {
    // Preprocesar imagen con sharp para mejorar OCR
    const processedPath = filepath + '.processed.jpg';
    await sharp(filepath)
      .grayscale()
      .normalize()
      .sharpen()
      .toFile(processedPath);

    // Ejecutar OCR
    const { data: { text } } = await Tesseract.recognize(
      processedPath,
      'spa+cat',
      {
        logger: info => console.log(info)
      }
    );

    // Limpiar archivo procesado
    await fs.unlink(processedPath);

    return text;
  } catch (error) {
    throw new Error(`Error al extraer texto de la imagen: ${error.message}`);
  }
};

// Función principal para procesar cualquier tipo de archivo
export const processFile = async (filepath, mimetype) => {
  try {
    let text = '';

    if (mimetype === 'application/pdf') {
      text = await extractTextFromPDF(filepath);
    } else if (
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimetype === 'application/msword'
    ) {
      text = await extractTextFromDOCX(filepath);
    } else if (mimetype.startsWith('image/')) {
      text = await extractTextFromImage(filepath);
    } else {
      throw new Error('Tipo de archivo no soportado');
    }

    // Validar que se extrajo texto
    if (!text || text.trim().length < 50) {
      throw new Error('No se pudo extraer suficiente texto del documento. Asegúrate de que el archivo contiene texto.');
    }

    return text.trim();
  } catch (error) {
    throw error;
  }
};

// Validar archivo
export const validateFile = (file) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'image/jpeg',
    'image/png'
  ];

  const maxSize = parseInt(process.env.MAX_FILE_SIZE) || 10485760; // 10MB por defecto

  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error('Tipo de archivo no permitido. Solo se aceptan PDF, DOCX, JPG y PNG.');
  }

  if (file.size > maxSize) {
    throw new Error(`El archivo es demasiado grande. Tamaño máximo: ${maxSize / 1048576}MB`);
  }

  return true;
};
