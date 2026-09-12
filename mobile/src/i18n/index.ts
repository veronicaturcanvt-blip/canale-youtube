import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

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
const deviceLanguage =
  RNLocalize.findBestLanguageTag(supportedLanguages)?.languageTag ?? 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
