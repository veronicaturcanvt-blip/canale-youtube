import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './locales/en.json';
import ru from './locales/ru.json';
import it from './locales/it.json';
import es from './locales/es.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  it: { translation: it },
  es: { translation: es },
  zh: { translation: zh },
  ja: { translation: ja },
};

const supportedLanguages = Object.keys(resources);
const deviceLanguageCode = getLocales()[0]?.languageCode ?? 'en';
const deviceLanguage = supportedLanguages.includes(deviceLanguageCode)
  ? deviceLanguageCode
  : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
