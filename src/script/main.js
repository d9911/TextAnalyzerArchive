// Main application logic
let translations = {};
let config = {};
let baseData = {};

// Fallback configuration if JSON files fail to load
const fallbackConfig = {
    app: {
        name: "Text Analyzer",
        version: "1.0.0",
        default_language: "en",
        supported_languages: ["en", "es", "ru", "fr", "de"],
        storage_keys: {
            language: "preferred-language",
            theme: "preferred-theme"
        }
    },
    icons: {
        theme: {
            light: "🌙",
            dark: "☀️"
        }
    },
    text_analysis: {
        default_values: {
            word_count: 0,
            char_count_with_spaces: 0,
            char_count_without_spaces: 0
        },
        update_events: ["input", "paste", "keyup"]
    },
    ui: {
        responsive_breakpoints: {
            mobile: 600,
            small_mobile: 400
        },
        animation_duration: "0.3s"
    }
};

// Fallback translations
const fallbackTranslations = {
    en: {
        app_title: "Text Analyzer",
        enter_text: "Enter your text",
        text_placeholder: "Type or paste your text here...",
        word_count: "Word count",
        char_count_with_spaces: "Character count with spaces",
        char_count_without_spaces: "Character count without spaces",
        light_theme: "Light theme",
        dark_theme: "Dark theme",
        theme_toggle: "TogT"
    },
    es: {
        app_title: "Analizador de Texto",
        enter_text: "Ingresa tu texto",
        text_placeholder: "Escribe o pega tu texto aquí...",
        word_count: "Conteo de palabras",
        char_count_with_spaces: "Conteo de caracteres con espacios",
        char_count_without_spaces: "Conteo de caracteres sin espacios",
        light_theme: "Tema claro",
        dark_theme: "Tema oscuro",
        theme_toggle: "Cambiar tema"
    },
    ru: {
        app_title: "Анализатор текста",
        enter_text: "Введите ваш текст",
        text_placeholder: "Введите или вставьте ваш текст здесь...",
        word_count: "Количество слов",
        char_count_with_spaces: "Количество символов с пробелами",
        char_count_without_spaces: "Количество символов без пробелов",
        light_theme: "Светлая тема",
        dark_theme: "Темная тема",
        theme_toggle: "Переключить тему"
    },
    fr: {
        app_title: "Analyseur de Texte",
        enter_text: "Entrez votre texte",
        text_placeholder: "Tapez ou collez votre texte ici...",
        word_count: "Nombre de mots",
        char_count_with_spaces: "Nombre de caractères avec espaces",
        char_count_without_spaces: "Nombre de caractères sans espaces",
        light_theme: "Thème clair",
        dark_theme: "Thème sombre",
        theme_toggle: "Changer le thème"
    },
    de: {
        app_title: "Text-Analysator",
        enter_text: "Geben Sie Ihren Text ein",
        text_placeholder: "Text hier eingeben oder einfügen...",
        word_count: "Wortanzahl",
        char_count_with_spaces: "Zeichenanzahl mit Leerzeichen",
        char_count_without_spaces: "Zeichenanzahl ohne Leerzeichen",
        light_theme: "Helles Thema",
        dark_theme: "Dunkles Thema",
        theme_toggle: "Thema wechseln"
    }
};

// Load and merge JSON data with base.json
async function loadJsonWithBase(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}`);
        }
        const data = await response.json();
        
        // If file extends base.json, merge with base data
        if (data.extends && data.extends === 'base.json') {
            const mergedData = { ...baseData, ...data };
            delete mergedData.extends; // Remove the extends property
            return mergedData;
        }
        
        return data;
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
        return null;
    }
}

// Load configuration and translations from JSON files
async function loadConfiguration() {
    try {
        // First, load base.json
        const baseResponse = await fetch('src/i18n/base.json');
        if (!baseResponse.ok) {
            throw new Error('Failed to load base.json');
        }
        baseData = await baseResponse.json();
        
        // Load config.json (which extends base.json)
        config = await loadJsonWithBase('src/i18n/config.json');
        if (!config) {
            throw new Error('Failed to load config.json');
        }
        
        // Load translations
        const supportedLanguages = config.app.supported_languages || ['en', 'es', 'ru', 'fr', 'de'];
        
        const translationPromises = supportedLanguages.map(async (lang) => {
            const data = await loadJsonWithBase(`src/i18n/${lang}.json`);
            if (data) {
                return { lang, data };
            }
            return null;
        });
        
        const results = await Promise.all(translationPromises);
        
        results.forEach(result => {
            if (result) {
                translations[result.lang] = result.data;
            }
        });
        
        return true;
    } catch (error) {
        console.error('Error loading configuration:', error);
        console.log('Using fallback configuration...');
        
        // Use fallback configuration
        config = fallbackConfig;
        translations = fallbackTranslations;
        baseData = {
            language_buttons: {
                en: "EN", es: "ES", ru: "RU", fr: "FR", de: "DE"
            },
            language_names: {
                en: "English", es: "Español", ru: "Русский", fr: "Français", de: "Deutsch"
            },
            theme_icons: {
                light: "🌙", dark: "☀️"
            },
            default_language: "en",
            supported_languages: ["en", "es", "ru", "fr", "de"],
            storage_keys: {
                language: "preferred-language",
                theme: "preferred-theme"
            }
        };
        
        return true; // Return true even with fallback
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing application...');
    
    // Load configuration and translations first
    const configLoaded = await loadConfiguration();
    
    if (!configLoaded) {
        console.error('Failed to load configuration. Application may not work properly.');
        return;
    }
    
    // Make config and translations available globally
    window.config = config;
    window.translations = translations;
    window.baseData = baseData;
    
    // Initialize systems
    try {
        window.i18n = new I18n();
    } catch (error) {
        console.error('Failed to initialize I18n:', error);
    }
    
    try {
        window.themeManager = new ThemeManager();
    } catch (error) {
        console.error('Failed to initialize ThemeManager:', error);
    }
    
    try {
        window.textAnalyzer = new TextAnalyzer();
    } catch (error) {
        console.error('Failed to initialize TextAnalyzer:', error);
    }

    // Set up event listeners
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            if (window.i18n) {
                window.i18n.setLanguage(selectedLang);
                if (window.themeManager) {
                    window.themeManager.updateThemeButton();
                }
            }
        });
    }

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (window.themeManager) {
                window.themeManager.toggleTheme();
            } else {
                console.error('ThemeManager not available');
            }
        });
    }
    
    console.log('Application initialization complete');
});