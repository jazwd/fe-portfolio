import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import homeEN from "@/locales/en/home.json";
import homeES from "@/locales/es/home.json";

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		resources: {
			en: {
				home: homeEN,
			},
			es: {
				home: homeES,
			},
		},
		fallbackLng: "en",
	});

export default i18n;
