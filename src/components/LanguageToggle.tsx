import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 p-2 flex items-center space-x-2">
        <div className="flex items-center space-x-1 text-sm">
          <Globe className="w-4 h-4 text-gray-600" />
        </div>
        
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setLanguage('es')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              language === 'es'
                ? 'bg-nuclear-purple text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            title={t('language.cambiarIdioma')}
          >
            ES
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              language === 'en'
                ? 'bg-nuclear-purple text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            title={t('language.cambiarIdioma')}
          >
            EN
          </button>
        </div>

        {/* Indicador del idioma actual */}
        <div className="text-xs text-gray-500 hidden md:block">
          {language === 'es' ? '🇪🇸' : '🇺🇸'}
        </div>
      </div>
    </div>
  );
}
