import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import zh from "./locales/zh.json";
import ja from "./locales/ja.json";

i18n
  .use(LanguageDetector) // 自动检测语言
  .use(initReactI18next) // 绑定 React
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      ja: { translation: ja },
    },
    fallbackLng: "en", // 默认语言
    interpolation: {
      escapeValue: false, // 防止 XSS 注入
    },
    returnObjects: true, // 确保返回对象而不是字符串
  });

export default i18n;
