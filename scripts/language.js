document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("language-selector");
    const elements = document.querySelectorAll("[data-i18n]");

    const supportedLanguages = ["en", "pt-BR", "jp"];

    // Cache original English texts keyed by data-i18n value
    const originalTexts = {};
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        const useHTML = el.hasAttribute("data-i18n-html");
        originalTexts[key] = useHTML ? el.innerHTML.trim() : el.textContent.trim();
    });

    async function loadLanguage(lang) {
        // Reset to original English texts
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
            } catch (err) {
                // Fallback to original English text on error
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
            }
        }
    }

    // Detect browser language
    function getBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage || "en";
        return lang.split("-")[0];
    }

    // Determine initial language
    let savedLang = localStorage.getItem("selectedLanguage");

    if (!savedLang) {
        const detectedLang = getBrowserLanguage();
        savedLang = supportedLanguages.includes(detectedLang) ? detectedLang : "en";
        localStorage.setItem("selectedLanguage", savedLang);
    }

    // Set select dropdown to the saved/detected language
    select.value = savedLang;

    // Load the selected language
    loadLanguage(savedLang);

    // Listen to user changes
    select.addEventListener("change", e => {
        const newLang = e.target.value;
        loadLanguage(newLang);
        localStorage.setItem("selectedLanguage", newLang);
    });
});
