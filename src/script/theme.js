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

    return 'dark';
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
    if (this.currentTheme === 'dark') {
      const title = translations[currentLang]?.light_theme || 'Light theme';
      button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2.25M12 19.75V22M4.93 4.93l1.59 1.59M17.48 17.48l1.59 1.59M2 12h2.25M19.75 12H22M4.93 19.07l1.59-1.59M17.48 6.52l1.59-1.59"/></svg>';
      button.setAttribute('title', title);
      button.setAttribute('aria-label', title);
    } else {
      const title = translations[currentLang]?.dark_theme || 'Dark theme';
      button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.5 8.5 0 1 0 20.4 15.2Z"/></svg>';
      button.setAttribute('title', title);
      button.setAttribute('aria-label', title);
    }
  }
}
