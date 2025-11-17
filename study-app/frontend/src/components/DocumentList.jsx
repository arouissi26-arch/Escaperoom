import { useEffect, useState } from 'react';
import { FiFile, FiTrash2, FiSearch, FiBook, FiCalendar } from 'react-icons/fi';
import { documentAPI } from '../services/api';
import { useI18n } from '../utils/i18n';
import { useDocumentStore } from '../store/useStore';

export default function DocumentList({ onSelectDocument }) {
  const { t } = useI18n();
  const {
    documents,
    selectedDocument,
    setDocuments,
    setSelectedDocument,
    removeDocument
  } = useDocumentStore();

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const response = await documentAPI.getAll();
      setDocuments(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();

    if (!window.confirm(t('documents.confirmDelete'))) {
      return;
    }

    try {
      await documentAPI.delete(id);
      removeDocument(id);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelectDocument = (doc) => {
    setSelectedDocument(doc);
    if (onSelectDocument) {
      onSelectDocument(doc);
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    const query = searchQuery.toLowerCase();
    return (
      doc.title.toLowerCase().includes(query) ||
      doc.subject?.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t('documents.title')}
        </h2>

        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('documents.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
          />
        </div>
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {error && (
          <div className="p-3 m-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {filteredDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-4">
            <FiFile className="text-gray-300 dark:text-gray-600 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery ? t('common.search') : t('documents.empty')}
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleSelectDocument(doc)}
                className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                  selectedDocument?.id === doc.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <FiFile
                        className={`flex-shrink-0 ${
                          selectedDocument?.id === doc.id
                            ? 'text-primary-500'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}
                        size={16}
                      />
                      <h3 className="font-medium text-gray-900 dark:text-white truncate text-sm">
                        {doc.title}
                      </h3>
                    </div>

                    {doc.subject && (
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <FiBook size={12} />
                        <span className="truncate">{doc.subject}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                      <FiCalendar size={12} />
                      <span>{formatDate(doc.upload_date)}</span>
                    </div>

                    {(doc.quiz_count > 0 || doc.flashcard_count > 0) && (
                      <div className="flex gap-2 mt-2">
                        {doc.quiz_count > 0 && (
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                            {doc.quiz_count} {t('documents.quizzes')}
                          </span>
                        )}
                        {doc.flashcard_count > 0 && (
                          <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded">
                            {doc.flashcard_count} {t('documents.flashcards')}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleDelete(doc.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-opacity"
                    title={t('documents.delete')}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
