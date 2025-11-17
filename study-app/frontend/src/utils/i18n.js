import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import ca from '../locales/ca.json';
import es from '../locales/es.json';

const translations = { ca, es };

export const useI18n = create(
  persist(
    (set, get) => ({
      language: 'ca', // Catalán por defecto
      setLanguage: (lang) => set({ language: lang }),
      t: (key) => {
        const keys = key.split('.');
        let value = translations[get().language];

        for (const k of keys) {
          value = value?.[k];
        }

        return value || key;
      }
    }),
    {
      name: 'language-storage',
    }
  )
);
