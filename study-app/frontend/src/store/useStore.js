import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark', // 'light' | 'dark' | 'auto'
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        }))
    }),
    {
      name: 'theme-storage'
    }
  )
);

export const useDocumentStore = create((set) => ({
  documents: [],
  selectedDocument: null,
  loading: false,
  error: null,

  setDocuments: (documents) => set({ documents }),
  setSelectedDocument: (document) => set({ selectedDocument: document }),
  addDocument: (document) =>
    set((state) => ({
      documents: [document, ...state.documents]
    })),
  updateDocument: (id, updates) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
      selectedDocument:
        state.selectedDocument?.id === id
          ? { ...state.selectedDocument, ...updates }
          : state.selectedDocument
    })),
  removeDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
      selectedDocument:
        state.selectedDocument?.id === id ? null : state.selectedDocument
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}));

export const useQuizStore = create((set) => ({
  currentQuiz: null,
  currentQuestionIndex: 0,
  userAnswers: {},
  showResults: false,
  timerEnabled: false,
  timeRemaining: 0,

  setCurrentQuiz: (quiz) =>
    set({
      currentQuiz: quiz,
      currentQuestionIndex: 0,
      userAnswers: {},
      showResults: false
    }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setUserAnswer: (questionIndex, answer) =>
    set((state) => ({
      userAnswers: { ...state.userAnswers, [questionIndex]: answer }
    })),
  setShowResults: (show) => set({ showResults: show }),
  setTimerEnabled: (enabled) => set({ timerEnabled: enabled }),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  resetQuiz: () =>
    set({
      currentQuiz: null,
      currentQuestionIndex: 0,
      userAnswers: {},
      showResults: false,
      timeRemaining: 0
    })
}));

export const useFlashcardStore = create((set) => ({
  flashcards: [],
  currentIndex: 0,
  flipped: false,
  filter: 'all', // 'all' | 'review' | 'known'

  setFlashcards: (flashcards) =>
    set({ flashcards, currentIndex: 0, flipped: false }),
  setCurrentIndex: (index) => set({ currentIndex: index, flipped: false }),
  setFlipped: (flipped) => set({ flipped }),
  toggleFlipped: () => set((state) => ({ flipped: !state.flipped })),
  setFilter: (filter) => set({ filter, currentIndex: 0, flipped: false }),
  updateFlashcard: (id, updates) =>
    set((state) => ({
      flashcards: state.flashcards.map((card) =>
        card.id === id ? { ...card, ...updates } : card
      )
    })),
  nextCard: () =>
    set((state) => ({
      currentIndex: Math.min(
        state.currentIndex + 1,
        state.flashcards.length - 1
      ),
      flipped: false
    })),
  previousCard: () =>
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0),
      flipped: false
    }))
}));
