import { useState, useEffect } from 'react';
import { FiClock, FiCheck, FiX } from 'react-icons/fi';
import { quizAPI } from '../services/api';
import { useI18n } from '../utils/i18n';
import { useQuizStore } from '../store/useStore';

export default function QuizPlayer({ document }) {
  const { t, language } = useI18n();
  const {
    currentQuiz,
    currentQuestionIndex,
    userAnswers,
    showResults,
    timerEnabled,
    setCurrentQuiz,
    setCurrentQuestionIndex,
    setUserAnswer,
    setShowResults,
    resetQuiz
  } = useQuizStore();

  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    return () => resetQuiz();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');

    try {
      const response = await quizAPI.generate(
        document.id,
        numQuestions,
        difficulty,
        language
      );
      setCurrentQuiz(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleAnswer = (answer) => {
    setUserAnswer(currentQuestionIndex, answer);
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleFinish = async () => {
    const score = Object.values(userAnswers).filter(
      (answer, index) => answer === currentQuiz.questions[index].correct
    ).length;

    try {
      await quizAPI.saveResult(currentQuiz.id, score, currentQuiz.questions.length);
    } catch (err) {
      console.error('Error saving result:', err);
    }

    setShowResults(true);
  };

  const calculateScore = () => {
    const correct = Object.values(userAnswers).filter(
      (answer, index) => answer === currentQuiz.questions[index].correct
    ).length;
    const total = currentQuiz.questions.length;
    return { correct, total, percentage: Math.round((correct / total) * 100) };
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

  // Setup screen
  if (!currentQuiz) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('quiz.title')}
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('quiz.numQuestions')}
              </label>
              <input
                type="number"
                min="5"
                max="50"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                disabled={generating}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('quiz.difficulty.label')}
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                disabled={generating}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="easy">{t('quiz.difficulty.easy')}</option>
                <option value="medium">{t('quiz.difficulty.medium')}</option>
                <option value="hard">{t('quiz.difficulty.hard')}</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('common.loading')}
              </span>
            ) : (
              t('quiz.generate')
            )}
          </button>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const { correct, total, percentage } = calculateScore();

    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('quiz.score')}
          </h2>

          <div className="mb-6">
            <div className="text-6xl font-bold text-primary-500 mb-2">
              {percentage}%
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {correct} {t('quiz.correct')} {t('quiz.of')} {total}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                resetQuiz();
              }}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
            >
              {t('quiz.retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz playing screen
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];
  const isAnswered = userAnswer !== undefined;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>
            {t('quiz.question')} {currentQuestionIndex + 1} {t('quiz.of')}{' '}
            {currentQuiz.questions.length}
          </span>
          <span>
            {Object.keys(userAnswers).length} / {currentQuiz.questions.length}{' '}
            {t('quiz.correct')}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100
              }%`
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {Object.entries(currentQuestion.options).map(([key, value]) => {
            const isCorrect = key === currentQuestion.correct;
            const isSelected = key === userAnswer;
            const showCorrectness = isAnswered && showExplanation;

            return (
              <button
                key={key}
                onClick={() => !isAnswered && handleAnswer(key)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrectness && isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : showCorrectness && isSelected && !isCorrect
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-medium">
                    {key}
                  </span>
                  <span className="flex-1 text-gray-900 dark:text-white">
                    {value}
                  </span>
                  {showCorrectness && isCorrect && (
                    <FiCheck className="text-green-500" size={24} />
                  )}
                  {showCorrectness && isSelected && !isCorrect && (
                    <FiX className="text-red-500" size={24} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && !showExplanation && (
          <button
            onClick={() => setShowExplanation(true)}
            className="mt-4 w-full py-2 text-primary-500 hover:text-primary-600 font-medium"
          >
            {t('quiz.showAnswer')}
          </button>
        )}

        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              {t('quiz.explanation')}
            </h4>
            <p className="text-blue-800 dark:text-blue-200">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {t('quiz.previous')}
        </button>

        {currentQuestionIndex === currentQuiz.questions.length - 1 ? (
          <button
            onClick={handleFinish}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
          >
            {t('quiz.finish')}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            {t('quiz.next')}
          </button>
        )}
      </div>
    </div>
  );
}
