// Theme management system
class ThemeManager {
    constructor() {
        console.log('ThemeManager constructor called');
        this.currentTheme = this.detectTheme();
        console.log('Detected theme:', this.currentTheme);
        this.setTheme(this.currentTheme);
        this.updateThemeButton();
    }

    detectTheme() {
        const storageKey = window.config?.app?.storage_keys?.theme || 'preferred-theme';
        const storedTheme = localStorage.getItem(storageKey);
        console.log('Stored theme:', storedTheme);
        
        if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
            return storedTheme;
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            console.log('System prefers dark theme');
            return 'dark';
        }
        
        console.log('Defaulting to light theme');
        return 'light';
    }

    setTheme(theme) {
        console.log('Setting theme to:', theme);
        
        if (!['light', 'dark'].includes(theme)) {
            console.warn(`Theme ${theme} is not supported`);
            return;
        }
        
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        const storageKey = window.config?.app?.storage_keys?.theme || 'preferred-theme';
        localStorage.setItem(storageKey, theme);
        console.log('Theme saved to localStorage:', theme);
        
        this.updateThemeButton();
    }

    toggleTheme() {
        console.log('Toggle theme called, current theme:', this.currentTheme);
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        console.log('Switching to theme:', newTheme);
        this.setTheme(newTheme);
    }

    updateThemeButton() {
        console.log('Updating theme button...');
        const button = document.getElementById('themeToggle');
        if (!button) {
            console.warn('Theme toggle button not found');
            return;
        }
        
        if (!window.i18n) {
            console.warn('I18n not available for theme button update');
            return;
        }
        
        const currentLang = window.i18n.currentLang;
        const translations = window.translations;
        const icons = window.config?.icons?.theme || { light: '🌙', dark: '☀️' };
        
        console.log('Current theme:', this.currentTheme);
        console.log('Current language:', currentLang);
        console.log('Available icons:', icons);
        
        if (this.currentTheme === 'dark') {
            const icon = icons.dark || '☀️';
            const title = translations[currentLang]?.light_theme || 'Light theme';
            button.textContent = icon;
            button.setAttribute('title', title);
            console.log('Set dark theme button:', icon, title);
        } else {
            const icon = icons.light || '🌙';
            const title = translations[currentLang]?.dark_theme || 'Dark theme';
            button.textContent = icon;
            button.setAttribute('title', title);
            console.log('Set light theme button:', icon, title);
        }
    }
} 