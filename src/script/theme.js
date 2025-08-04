// Theme management system
class ThemeManager {
    constructor() {
        this.currentTheme = this.detectTheme();
        this.setTheme(this.currentTheme);
        this.updateThemeButton();
    }

    detectTheme() {
        const storageKey = window.config?.app?.storage_keys?.theme || 'preferred-theme';
        const storedTheme = localStorage.getItem(storageKey);
        
        if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
            return storedTheme;
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        return 'light';
    }

    setTheme(theme) {
        if (!['light', 'dark'].includes(theme)) {
            console.warn(`Theme ${theme} is not supported`);
            return;
        }
        
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        const storageKey = window.config?.app?.storage_keys?.theme || 'preferred-theme';
        localStorage.setItem(storageKey, theme);
        
        this.updateThemeButton();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeButton() {
        const button = document.getElementById('themeToggle');
        if (!button) {
            return;
        }
        
        if (!window.i18n) {
            return;
        }
        
        const currentLang = window.i18n.currentLang;
        const translations = window.translations;
        const icons = window.config?.icons?.theme || { light: '🌙', dark: '☀️' };
        
        if (this.currentTheme === 'dark') {
            const icon = icons.dark || '☀️';
            const title = translations[currentLang]?.light_theme || 'Light theme';
            button.textContent = icon;
            button.setAttribute('title', title);
        } else {
            const icon = icons.light || '🌙';
            const title = translations[currentLang]?.dark_theme || 'Dark theme';
            button.textContent = icon;
            button.setAttribute('title', title);
        }
    }
}