import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en.json';
import zh from '../locales/zh-cn.json';
import tw from '../locales/zh-tw.json';

export const SUPPORTED_LANG = [
    'zh',
    'en',
    'tw',
];
const lang = window.localStorage.getItem('i18nextLng') || 'zh';
// 配置参数的文档: https://www.i18next.com/overview/configuration-options
const option = {
    fallbackLng: lang, // 默认语言 'zh'
    debug: process.env.NODE_ENV !== 'production',
    resources: { // 支持的语言 //{ ...zh , ...errors  }
        en: {
            translation: en,
        },
        zh: {
            translation: zh,
        },
        tw: {
            translation: tw,
        },
    },
    interpolation: {
        escapeValue: false, // not needed for react!!
    },
};
// 注入react-i18next实例并初始化
i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init(option);

export default i18n;
