'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ACTIVE_LOCALE_STORAGE_KEY,
  DEFAULT_LANGUAGES,
  DEFAULT_TRANSLATIONS,
  I18N_STORAGE_KEY,
} from '@/lib/i18n-store';
import { LanguageConfig, LocaleCode, TranslationDictionary } from '@/lib/types';

interface I18nContextValue {
  locale: LocaleCode;
  languages: LanguageConfig[];
  translations: Record<LocaleCode, TranslationDictionary>;
  setLocale: (code: LocaleCode) => void;
  t: (key: string) => string;
  toggleLanguageEnabled: (code: LocaleCode) => void;
  setDefaultLanguage: (code: LocaleCode) => void;
  updateTranslationKey: (locale: LocaleCode, key: string, value: string) => void;
  resetAllTranslations: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [languages, setLanguages] = useState<LanguageConfig[]>(DEFAULT_LANGUAGES);
  const [translations, setTranslations] =
    useState<Record<LocaleCode, TranslationDictionary>>(DEFAULT_TRANSLATIONS);
  const [locale, setLocaleState] = useState<LocaleCode>('en');

  useEffect(() => {
    try {
      const savedConfigRaw = localStorage.getItem(I18N_STORAGE_KEY);
      let loadedLanguages = DEFAULT_LANGUAGES;
      if (savedConfigRaw) {
        const parsed = JSON.parse(savedConfigRaw) as {
          languages?: LanguageConfig[];
          translations?: Record<LocaleCode, TranslationDictionary>;
        };
        if (Array.isArray(parsed.languages) && parsed.languages.length === 4) {
          loadedLanguages = parsed.languages;
          // Persisted settings are loaded once after client hydration.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setLanguages(parsed.languages);
        }
        if (parsed.translations) {
          setTranslations({
            en: { ...DEFAULT_TRANSLATIONS.en, ...(parsed.translations.en || {}) },
            es: { ...DEFAULT_TRANSLATIONS.es, ...(parsed.translations.es || {}) },
            fr: { ...DEFAULT_TRANSLATIONS.fr, ...(parsed.translations.fr || {}) },
            pt: { ...DEFAULT_TRANSLATIONS.pt, ...(parsed.translations.pt || {}) },
          });
        }
      }

      const savedLocale = localStorage.getItem(ACTIVE_LOCALE_STORAGE_KEY) as LocaleCode | null;
      const defaultLang = loadedLanguages.find((l) => l.isDefault && l.enabled)?.code || 'en';
      if (savedLocale && loadedLanguages.some((l) => l.code === savedLocale && l.enabled)) {
        setLocaleState(savedLocale);
      } else {
        setLocaleState(defaultLang);
      }
    } catch {
      // Fallback to defaults if localStorage is unavailable
    }
  }, []);

  const persistConfig = (
    nextLanguages: LanguageConfig[],
    nextTranslations: Record<LocaleCode, TranslationDictionary>
  ) => {
    try {
      localStorage.setItem(
        I18N_STORAGE_KEY,
        JSON.stringify({ languages: nextLanguages, translations: nextTranslations })
      );
    } catch {
      // Ignore storage write errors
    }
  };

  const setLocale = (code: LocaleCode) => {
    const target = languages.find((l) => l.code === code);
    if (!target || !target.enabled) return;
    setLocaleState(code);
    try {
      localStorage.setItem(ACTIVE_LOCALE_STORAGE_KEY, code);
      document.documentElement.lang = code;
    } catch {
      // Ignore storage write errors
    }
  };

  const toggleLanguageEnabled = (code: LocaleCode) => {
    setLanguages((prev) => {
      const enabledCount = prev.filter((l) => l.enabled).length;
      const target = prev.find((l) => l.code === code);
      if (!target) return prev;
      if (target.enabled && enabledCount <= 1) {
        return prev;
      }

      const updated = prev.map((l) =>
        l.code === code ? { ...l, enabled: !l.enabled } : l
      );

      if (!updated.some((l) => l.isDefault && l.enabled)) {
        const firstEnabled = updated.find((l) => l.enabled);
        if (firstEnabled) {
          for (const item of updated) {
            item.isDefault = item.code === firstEnabled.code;
          }
        }
      }

      const activeStillEnabled = updated.find((l) => l.code === locale && l.enabled);
      if (!activeStillEnabled) {
        const fallback = updated.find((l) => l.isDefault && l.enabled) || updated.find((l) => l.enabled);
        if (fallback) {
          setLocaleState(fallback.code);
        }
      }

      persistConfig(updated, translations);
      return updated;
    });
  };

  const setDefaultLanguage = (code: LocaleCode) => {
    setLanguages((prev) => {
      const updated = prev.map((l) => ({
        ...l,
        enabled: l.code === code ? true : l.enabled,
        isDefault: l.code === code,
      }));
      persistConfig(updated, translations);
      return updated;
    });
    setLocaleState(code);
  };

  const updateTranslationKey = (targetLocale: LocaleCode, key: string, value: string) => {
    setTranslations((prev) => {
      const next = {
        ...prev,
        [targetLocale]: {
          ...prev[targetLocale],
          [key]: value,
        },
      };
      persistConfig(languages, next);
      return next;
    });
  };

  const resetAllTranslations = () => {
    setLanguages(DEFAULT_LANGUAGES);
    setTranslations(DEFAULT_TRANSLATIONS);
    setLocaleState('en');
    try {
      localStorage.removeItem(I18N_STORAGE_KEY);
      localStorage.setItem(ACTIVE_LOCALE_STORAGE_KEY, 'en');
    } catch {
      // Ignore storage errors
    }
  };

  const t = (key: string): string => {
    return (
      translations[locale]?.[key] ??
      DEFAULT_TRANSLATIONS[locale]?.[key] ??
      DEFAULT_TRANSLATIONS.en[key] ??
      key
    );
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        languages,
        translations,
        setLocale,
        t,
        toggleLanguageEnabled,
        setDefaultLanguage,
        updateTranslationKey,
        resetAllTranslations,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      locale: 'en',
      languages: DEFAULT_LANGUAGES,
      translations: DEFAULT_TRANSLATIONS,
      setLocale: () => {},
      t: (key: string) => DEFAULT_TRANSLATIONS.en[key] ?? key,
      toggleLanguageEnabled: () => {},
      setDefaultLanguage: () => {},
      updateTranslationKey: () => {},
      resetAllTranslations: () => {},
    };
  }
  return ctx;
}