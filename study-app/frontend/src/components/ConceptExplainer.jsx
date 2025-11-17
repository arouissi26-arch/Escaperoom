import { useState } from 'react';
import { FiSearch, FiHelpCircle } from 'react-icons/fi';
import { explainAPI } from '../services/api';
import { useI18n } from '../utils/i18n';

export default function ConceptExplainer({ document }) {
  const { t, language } = useI18n();

  const [concept, setConcept] = useState('');
  const [explanation, setExplanation] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [explaining, setExplaining] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!concept.trim()) return;

    setSearching(true);
    setError('');

    try {
      const response = await explainAPI.search(document.id, concept);
      setSearchResults(response.data.matches || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setSearching(false);
    }
  };

  const handleExplain = async () => {
    if (!concept.trim()) return;

    setExplaining(true);
    setError('');

    try {
      const response = await explainAPI.explain(
        document.id,
        concept,
        language
      );
      setExplanation(response.data.explanation);
    } catch (err) {
      setError(err.message);
    } finally {
      setExplaining(false);
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t('explain.title')}
        </h2>

        {/* Search Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('explain.concept')}
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleExplain()}
                placeholder={t('explain.search')}
                className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={handleSearch}
            disabled={!concept.trim() || searching}
            className="flex-1 py-3 px-4 border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
          >
            {searching ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                {t('explain.searching')}
              </>
            ) : (
              <>
                <FiSearch />
                {t('explain.searchInDoc')}
              </>
            )}
          </button>

          <button
            onClick={handleExplain}
            disabled={!concept.trim() || explaining}
            className="flex-1 py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
          >
            {explaining ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('explain.explaining')}
              </>
            ) : (
              <>
                <FiHelpCircle />
                {t('explain.explain')}
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              {t('explain.foundIn')} ({searchResults.length})
            </h3>
            <div className="space-y-2">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                >
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explanation */}
        {explanation && (
          <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <FiHelpCircle className="text-primary-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {concept}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('explain.explanation')}
                </p>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
