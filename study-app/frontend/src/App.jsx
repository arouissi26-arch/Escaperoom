import { useState, useEffect } from 'react';
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiFileText,
  FiBook,
  FiHelpCircle,
  FiLayers,
  FiUpload
} from 'react-icons/fi';
import { useI18n } from './utils/i18n';
import { useThemeStore, useDocumentStore } from './store/useStore';
import DocumentList from './components/DocumentList';
import FileUpload from './components/FileUpload';
import SummaryGenerator from './components/SummaryGenerator';
import QuizPlayer from './components/QuizPlayer';
import Flashcards from './components/Flashcards';
import ConceptExplainer from './components/ConceptExplainer';

function App() {
  const { t, language, setLanguage } = useI18n();
  const { theme, toggleTheme } = useThemeStore();
  const { selectedDocument } = useDocumentStore();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('upload');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const navItems = [
    { id: 'upload', icon: FiUpload, label: t('upload.title') },
    { id: 'summary', icon: FiFileText, label: t('summary.title') },
    { id: 'quiz', icon: FiLayers, label: t('quiz.title') },
    { id: 'flashcards', icon: FiBook, label: t('flashcards.title') },
    { id: 'explain', icon: FiHelpCircle, label: t('explain.title') }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'upload':
        return (
          <FileUpload
            onUploadSuccess={(doc) => {
              setActiveView('summary');
            }}
          />
        );
      case 'summary':
        return <SummaryGenerator document={selectedDocument} />;
      case 'quiz':
        return <QuizPlayer document={selectedDocument} />;
      case 'flashcards':
        return <Flashcards document={selectedDocument} />;
      case 'explain':
        return <ConceptExplainer document={selectedDocument} />;
      default:
        return <FileUpload />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg lg:hidden"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('app.title')}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                {t('app.subtitle')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="ca">Català</option>
              <option value="es">Español</option>
            </select>

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:static lg:translate-x-0 inset-y-0 left-0 z-40 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 top-16`}
        >
          <DocumentList
            onSelectDocument={(doc) => {
              setActiveView('summary');
              setMobileMenuOpen(false);
            }}
          />
        </aside>

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          />
        )}

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isDisabled =
                  item.id !== 'upload' && !selectedDocument;

                return (
                  <button
                    key={item.id}
                    onClick={() => !isDisabled && setActiveView(item.id)}
                    disabled={isDisabled}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                      activeView === item.id
                        ? 'border-primary-500 text-primary-500'
                        : isDisabled
                        ? 'border-transparent text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="p-4 md:p-6">{renderActiveView()}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
