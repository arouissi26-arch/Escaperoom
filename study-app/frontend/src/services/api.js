import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Ha ocurrido un error';
    return Promise.reject(new Error(message));
  }
);

// DOCUMENTS
export const documentAPI = {
  getAll: () => api.get('/documents'),
  getById: (id) => api.get(`/documents/${id}`),
  upload: (formData, onProgress) =>
    api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress
    }),
  update: (id, data) => api.put(`/documents/${id}`, data),
  delete: (id) => api.delete(`/documents/${id}`),
  updateStudyDate: (id) => api.put(`/documents/${id}/study`),
  search: (query) => api.get(`/documents/search/${query}`)
};

// SUMMARIES
export const summaryAPI = {
  getByDocument: (documentId) => api.get(`/summaries/document/${documentId}`),
  generate: (documentId, level, language) =>
    api.post('/summaries/generate', { documentId, level, language }),
  toggleFavorite: (id, isFavorite) =>
    api.put(`/summaries/${id}/favorite`, { isFavorite }),
  delete: (id) => api.delete(`/summaries/${id}`)
};

// QUIZ
export const quizAPI = {
  getByDocument: (documentId) => api.get(`/quiz/document/${documentId}`),
  getById: (id) => api.get(`/quiz/${id}`),
  generate: (documentId, numQuestions, difficulty, language) =>
    api.post('/quiz/generate', {
      documentId,
      numQuestions,
      difficulty,
      language
    }),
  saveResult: (quizId, score, totalQuestions) =>
    api.post(`/quiz/${quizId}/results`, { score, totalQuestions }),
  getResults: (quizId) => api.get(`/quiz/${quizId}/results`),
  delete: (id) => api.delete(`/quiz/${id}`)
};

// FLASHCARDS
export const flashcardAPI = {
  getByDocument: (documentId, status) => {
    const params = status ? { status } : {};
    return api.get(`/flashcards/document/${documentId}`, { params });
  },
  generate: (documentId, language) =>
    api.post('/flashcards/generate', { documentId, language }),
  review: (id, quality) =>
    api.put(`/flashcards/${id}/review`, { quality }),
  reset: (id) => api.put(`/flashcards/${id}/reset`),
  delete: (id) => api.delete(`/flashcards/${id}`)
};

// EXPLAIN
export const explainAPI = {
  explain: (documentId, concept, language) =>
    api.post('/explain', { documentId, concept, language }),
  search: (documentId, searchTerm) =>
    api.post('/explain/search', { documentId, searchTerm })
};

export default api;
