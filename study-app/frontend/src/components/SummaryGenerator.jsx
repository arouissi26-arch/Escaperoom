import { useState, useEffect } from 'react';
import { FiRefreshCw, FiStar, FiTrash2 } from 'react-icons/fi';
import { summaryAPI } from '../services/api';
import { useI18n } from '../utils/i18n';

export default function SummaryGenerator({ document }) {
  const { t, language } = useI18n();
  const [summaries, setSummaries] = useState([]);
  const [level, setLevel] = useState('medium');
  const [generating, setGenerating] = useState(false);
  const [currentSummary, setCurrentSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (document) {
      loadSummaries();
    }
  }, [document]);

  const loadSummaries = async () => {
    try {
      const response = await summaryAPI.getByDocument(document.id);
      setSummaries(response.data);
      if (response.data.length > 0) {
        setCurrentSummary(response.data[0]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');

    try {
      const response = await summaryAPI.generate(document.id, level, language);
      const newSummary = response.data;
      setSummaries([newSummary, ...summaries]);
      setCurrentSummary(newSummary);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const toggleFavorite = async (id, isFavorite) => {
    try {
      await summaryAPI.toggleFavorite(id, !isFavorite);
      setSummaries(
        summaries.map((s) =>
          s.id === id ? { ...s, is_favorite: !isFavorite ? 1 : 0 } : s
        )
      );
      if (currentSummary?.id === id) {
        setCurrentSummary({
          ...currentSummary,
          is_favorite: !isFavorite ? 1 : 0
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteSummary = async (id) => {
    try {
      await summaryAPI.delete(id);
      const updated = summaries.filter((s) => s.id !== id);
      setSummaries(updated);
      if (currentSummary?.id === id) {
        setCurrentSummary(updated[0] || null);
      }
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

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t('summary.title')}
        </h2>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('summary.level.label')}
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              disabled={generating}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="short">{t('summary.level.short')}</option>
              <option value="medium">{t('summary.level.medium')}</option>
              <option value="long">{t('summary.level.long')}</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              {generating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t('summary.generating')}
                </>
              ) : (
                <>
                  <FiRefreshCw size={18} />
                  {t('summary.generate')}
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Summaries */}
      <div className="flex-1 overflow-y-auto">
        {summaries.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">
              {t('summary.empty')}
            </p>
          </div>
        ) : (
          <div className="p-6">
            {/* Tabs */}
            {summaries.length > 1 && (
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {summaries.map((summary, index) => (
                  <button
                    key={summary.id}
                    onClick={() => setCurrentSummary(summary)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      currentSummary?.id === summary.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {t(`summary.level.${summary.summary_level}`)} #{index + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Current Summary */}
            {currentSummary && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                      {t(`summary.level.${currentSummary.summary_level}`)}
                    </span>
                    {currentSummary.is_favorite === 1 && (
                      <FiStar className="text-yellow-500" fill="currentColor" />
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        toggleFavorite(
                          currentSummary.id,
                          currentSummary.is_favorite === 1
                        )
                      }
                      className="p-2 text-gray-500 hover:text-yellow-500 transition-colors"
                      title={t('summary.favorite')}
                    >
                      <FiStar
                        fill={
                          currentSummary.is_favorite === 1
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </button>
                    <button
                      onClick={() => deleteSummary(currentSummary.id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      title={t('common.delete')}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {currentSummary.summary_text}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
