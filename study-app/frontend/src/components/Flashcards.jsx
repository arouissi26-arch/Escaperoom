import { useState, useEffect } from 'react';
import { FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { flashcardAPI } from '../services/api';
import { useI18n } from '../utils/i18n';
import { useFlashcardStore } from '../store/useStore';

export default function Flashcards({ document }) {
  const { t, language } = useI18n();
  const {
    flashcards,
    currentIndex,
    flipped,
    filter,
    setFlashcards,
    setCurrentIndex,
    toggleFlipped,
    setFilter,
    updateFlashcard,
    nextCard,
    previousCard
  } = useFlashcardStore();

  const [generating, setGenerating] = useState(false);
  const [rating, setRating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (document) {
      loadFlashcards();
    }
  }, [document, filter]);

  const loadFlashcards = async () => {
    try {
      const statusFilter = filter === 'all' ? null : filter;
      const response = await flashcardAPI.getByDocument(
        document.id,
        statusFilter
      );
      setFlashcards(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');

    try {
      const response = await flashcardAPI.generate(document.id, language);
      setFlashcards(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleRating = async (quality) => {
    try {
      const response = await flashcardAPI.review(
        flashcards[currentIndex].id,
        quality
      );
      updateFlashcard(flashcards[currentIndex].id, response.data);
      setRating(false);

      // Auto advance to next card
      setTimeout(() => {
        if (currentIndex < flashcards.length - 1) {
          nextCard();
        }
      }, 500);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!document) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">
          {t('documents.empty')}
        </p>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('flashcards.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('flashcards.empty')}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
          >
            {generating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('flashcards.generating')}
              </>
            ) : (
              <>
                <FiRefreshCw />
                {t('flashcards.generate')}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {['all', 'review', 'known'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {t(`flashcards.status.${f}`)}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          {currentIndex + 1} {t('flashcards.of')} {flashcards.length}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / flashcards.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div
        className="relative h-96 mb-6 cursor-pointer perspective-1000"
        onClick={toggleFlipped}
      >
        <div
          className={`w-full h-full transition-transform duration-500 transform-style-3d ${
            flipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front */}
          <div
            className={`absolute w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 flex items-center justify-center backface-hidden ${
              flipped ? 'invisible' : 'visible'
            }`}
          >
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {t('flashcards.title')}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentCard.front}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                {t('flashcards.flip')}
              </p>
            </div>
          </div>

          {/* Back */}
          <div
            className={`absolute w-full h-full bg-primary-50 dark:bg-primary-900/20 rounded-lg shadow-xl p-8 flex items-center justify-center backface-hidden rotate-y-180 ${
              flipped ? 'visible' : 'invisible'
            }`}
          >
            <div className="text-center">
              <p className="text-sm text-primary-600 dark:text-primary-400 mb-4">
                {t('quiz.explanation')}
              </p>
              <p className="text-xl text-gray-900 dark:text-white whitespace-pre-wrap">
                {currentCard.back}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rating (shown after flip) */}
      {flipped && !rating && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h4 className="text-center font-semibold text-gray-900 dark:text-white mb-4">
            {t('flashcards.rating.title')}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[0, 1, 2, 3, 4, 5].map((q) => (
              <button
                key={q}
                onClick={() => handleRating(q)}
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  q <= 2
                    ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30'
                    : q === 3
                    ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/30'
                    : 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30'
                }`}
              >
                <div className="text-2xl font-bold mb-1">{q}</div>
                <div className="text-xs">{t(`flashcards.rating.${q}`)}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            previousCard();
          }}
          disabled={currentIndex === 0}
          className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
        >
          <FiChevronLeft />
          {t('flashcards.previous')}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextCard();
          }}
          disabled={currentIndex === flashcards.length - 1}
          className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
        >
          {t('flashcards.next')}
          <FiChevronRight />
        </button>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
