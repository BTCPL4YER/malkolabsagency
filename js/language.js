import { translations } from "./translations.js";

let currentLanguage = "en";

const getTranslation = (language, path) => path.split(".").reduce((value, key) => value?.[key], translations[language]);

export const translate = (key) => getTranslation(currentLanguage, key) ?? getTranslation("en", key) ?? key;

export const initLanguage = () => {
    const applyLanguage = (language) => {
        currentLanguage = translations[language] ? language : "en";
        document.documentElement.lang = currentLanguage;

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const value = translate(element.dataset.i18n);
            if (value !== element.dataset.i18n) element.textContent = value;
        });
        document.querySelectorAll("[data-i18n-html]").forEach((element) => {
            const value = translate(element.dataset.i18nHtml);
            if (value !== element.dataset.i18nHtml) element.innerHTML = value;
        });

        ["aria-label", "alt", "placeholder", "title"].forEach((attribute) => {
            const datasetKey = `i18n${attribute.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("")}`;
            const dataAttribute = datasetKey.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
            document.querySelectorAll(`[data-${dataAttribute}]`).forEach((element) => {
                const value = translate(element.dataset[datasetKey]);
                if (value !== element.dataset[datasetKey]) element.setAttribute(attribute, value);
            });
        });

        document.querySelectorAll(".language-button").forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
        });
        localStorage.setItem("language", currentLanguage);
        document.dispatchEvent(new CustomEvent("languagechange", { detail: { language: currentLanguage } }));
    };

    document.querySelectorAll(".language-button").forEach((button) => {
        button.addEventListener("click", () => applyLanguage(button.dataset.language));
    });
    applyLanguage(localStorage.getItem("language") || "en");
};
