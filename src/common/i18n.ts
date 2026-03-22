import i18n, { type InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "../assets/locales/en/translations.json";
import translationTR from "../assets/locales/tr/translations.json";
import { isProduction } from "./utils";

export const defaultNS = "translations";
export const resources = {
	en: { translations: translationEN },
	tr: { translations: translationTR },
} as const;

const i18nOptions: InitOptions = {
	defaultNS,
	ns: [defaultNS],
	resources,
	debug: !isProduction,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
};

void i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init(i18nOptions);
