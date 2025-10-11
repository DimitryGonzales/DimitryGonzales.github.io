document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("language-selector");
    const elements = document.querySelectorAll("[data-i18n]");
    const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");

    const supportedLanguages = ["en", "pt", "ja"];

    const originalTexts = {};
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        const useHTML = el.hasAttribute("data-i18n-html");
        originalTexts[key] = useHTML ? el.innerHTML.trim() : el.textContent.trim();
    });

    const originalPlaceholders = {};
    placeholderElements.forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        originalPlaceholders[key] = el.getAttribute("placeholder");
    });

    async function loadLanguage(lang) {
        document.documentElement.lang = lang;

        if (lang === "en") {
            elements.forEach(el => {
                const key = el.getAttribute("data-i18n");
                const useHTML = el.hasAttribute("data-i18n-html");
                const content = originalTexts[key];
                if (useHTML) {
                    el.innerHTML = content;
                } else {
                    el.textContent = content;
                }
            });

            placeholderElements.forEach(el => {
                const key = el.getAttribute("data-i18n-placeholder");
                el.setAttribute("placeholder", originalPlaceholders[key]);
            });

        } else {
            try {
                const response = await fetch(`languages/${lang}.json`);
                if (!response.ok) throw new Error("Language file not found");
                const translations = await response.json();

                elements.forEach(el => {
                    const key = el.getAttribute("data-i18n");
                    const useHTML = el.hasAttribute("data-i18n-html");
                    const content = translations[key] || originalTexts[key];
                    if (useHTML) {
                        el.innerHTML = content;
                    } else {
                        el.textContent = content;
                    }
                });

                placeholderElements.forEach(el => {
                    const key = el.getAttribute("data-i18n-placeholder");
                    if (translations[key]) {
                        el.setAttribute("placeholder", translations[key]);
                    } else {
                        el.setAttribute("placeholder", originalPlaceholders[key]);
                    }
                });

            } catch (err) {
                console.error("Error loading language file:", err);

                elements.forEach(el => {
                    const key = el.getAttribute("data-i18n");
                    const useHTML = el.hasAttribute("data-i18n-html");
                    const content = originalTexts[key];
                    if (useHTML) {
                        el.innerHTML = content;
                    } else {
                        el.textContent = content;
                    }
                });

                placeholderElements.forEach(el => {
                    const key = el.getAttribute("data-i18n-placeholder");
                    el.setAttribute("placeholder", originalPlaceholders[key]);
                });
            }
        }
    }

    function getBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage || "en";
        return lang.split("-")[0];
    }

    let savedLang = localStorage.getItem("selectedLanguage");

    if (!savedLang) {
        const detectedLang = getBrowserLanguage();
        savedLang = supportedLanguages.includes(detectedLang) ? detectedLang : "en";
        localStorage.setItem("selectedLanguage", savedLang);
    }

    select.value = savedLang;
    loadLanguage(savedLang);

    select.addEventListener("change", e => {
        const newLang = e.target.value;
        loadLanguage(newLang);
        localStorage.setItem("selectedLanguage", newLang);
    });
});
