// Internationalization system
class I18n {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.updateContent();
        this.updateLanguageSelect();
    }

    detectLanguage() {
        const storedLang = localStorage.getItem(window.config?.app?.storage_keys?.language || 'preferred-language');
        if (storedLang && window.config?.app?.supported_languages?.includes(storedLang)) {
            return storedLang;
        }
        
        const browserLang = navigator.language.split('-')[0];
        const supportedLanguages = window.config?.app?.supported_languages || ['en', 'es', 'ru', 'fr', 'de'];
        
        if (supportedLanguages.includes(browserLang)) {
            return browserLang;
        }
        
        return window.config?.app?.default_language || 'en';
    }

    setLanguage(lang) {
        if (!window.config?.app?.supported_languages?.includes(lang)) {
            console.warn(`Language ${lang} is not supported`);
            return;
        }
        
        this.currentLang = lang;
        localStorage.setItem(window.config?.app?.storage_keys?.language || 'preferred-language', lang);
        this.updateContent();
        this.updateLanguageSelect();
    }

    updateContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(this.currentLang, key);
            if (translation) {
                element.textContent = translation;
            }
        });

        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.getNestedTranslation(this.currentLang, key);
            if (translation) {
                element.placeholder = translation;
            }
        });
    }

    getNestedTranslation(lang, key) {
        const keys = key.split('.');
        let value = window.translations[lang];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    }

    updateLanguageSelect() {
        const select = document.getElementById('languageSelect');
        if (!select) return;
        
        select.value = this.currentLang;
    }
} 