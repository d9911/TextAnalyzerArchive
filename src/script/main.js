// Main application logic
let translations = {};
let config = {};
let baseData = {};

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
        console.log('Loading configuration...');
        
        // First, load base.json
        const baseResponse = await fetch('src/i18n/base.json');
        if (!baseResponse.ok) {
            throw new Error('Failed to load base.json');
        }
        baseData = await baseResponse.json();
        console.log('Base data loaded:', baseData);
        
        // Load config.json (which extends base.json)
        config = await loadJsonWithBase('src/i18n/config.json');
        if (!config) {
            throw new Error('Failed to load config.json');
        }
        console.log('Config loaded:', config);
        
        // Load translations
        const supportedLanguages = config.app.supported_languages || ['en', 'es', 'ru', 'fr', 'de'];
        console.log('Loading translations for languages:', supportedLanguages);
        
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
        
        console.log('Configuration and translations loaded successfully');
        console.log('Available translations:', Object.keys(translations));
        return true;
    } catch (error) {
        console.error('Error loading configuration:', error);
        return false;
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
    
    console.log('Initializing systems...');
    
    // Initialize systems
    try {
        window.i18n = new I18n();
        console.log('I18n initialized');
    } catch (error) {
        console.error('Failed to initialize I18n:', error);
    }
    
    try {
        window.themeManager = new ThemeManager();
        console.log('ThemeManager initialized');
    } catch (error) {
        console.error('Failed to initialize ThemeManager:', error);
    }
    
    try {
        window.textAnalyzer = new TextAnalyzer();
        console.log('TextAnalyzer initialized');
    } catch (error) {
        console.error('Failed to initialize TextAnalyzer:', error);
    }

    // Set up event listeners
    console.log('Setting up event listeners...');
    
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        console.log('Language select found, adding event listener');
        languageSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            console.log('Language changed to:', selectedLang);
            if (window.i18n) {
                window.i18n.setLanguage(selectedLang);
                if (window.themeManager) {
                    window.themeManager.updateThemeButton();
                }
            }
        });
    } else {
        console.warn('Language select not found');
    }

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        console.log('Theme toggle found, adding event listener');
        themeToggle.addEventListener('click', () => {
            console.log('Theme toggle clicked');
            if (window.themeManager) {
                window.themeManager.toggleTheme();
            } else {
                console.error('ThemeManager not available');
            }
        });
    } else {
        console.warn('Theme toggle not found');
    }
    
    console.log('Application initialization complete');
}); 