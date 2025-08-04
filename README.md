# Text Analyzer - Embeddable Web App

A simple, embeddable HTML/CSS/JS web application with internationalization (i18n), theme switching, and real-time text analysis functionality featuring a beautiful glass morphism design.

## Features

### 🌍 Internationalization (i18n)
- **Five supported languages**: English, Spanish, Russian, French, and German
- **Dropdown language selector**: Clean dropdown menu instead of multiple buttons
- **Automatic language detection**: Detects user's browser language on first load
- **Manual language switching**: Dropdown to override the default language
- **Persistent preferences**: Language choice is saved in localStorage
- **External JSON translations**: All translations stored in `src/i18n/` directory
- **Dynamic loading**: Translations and configuration loaded asynchronously
- **No hardcoded values**: All text and configuration comes from JSON files
- **Base data inheritance**: Common data shared via `base.json` to avoid duplication

### 🌓 Light/Dark Themes with Glass Morphism
- **Beautiful glass morphism design**: Modern translucent glass effect
- **System preference detection**: Automatically detects user's system theme preference
- **Manual theme toggle**: Button to switch between light and dark themes
- **Persistent theme**: Theme choice is saved in localStorage
- **Smooth transitions**: CSS transitions for theme switching
- **Configurable icons**: Theme icons defined in JSON configuration
- **Backdrop blur effects**: Modern glass morphism with blur effects

### 📊 Text Analysis
- **Real-time counting**: Updates as user types
- **Word count**: Counts words (space-separated)
- **Character count with spaces**: Total character count including spaces
- **Character count without spaces**: Character count excluding spaces
- **Responsive design**: Works on all screen sizes
- **Configurable events**: Text analysis events defined in JSON

## Files

- `index.html` - Full-featured standalone application
- `embed.html` - Compact embeddable version for integration
- `test.html` - Comprehensive test page with debugging tools
- `quick-test.html` - Minimal test for theme switching
- `README.md` - This documentation file

## Testing

### Quick Theme Test
Open `quick-test.html` in your browser to quickly test if theme switching works:
- Click the theme toggle button (🌙/☀️)
- The page should switch between light and dark themes
- Check browser console for debug messages

### Full Application Test
Open `test.html` in your browser for comprehensive testing:
- **Test Theme Toggle**: Verifies theme switching functionality
- **Test Language Change**: Tests internationalization
- **Test Text Analysis**: Checks real-time counting
- **Show Debug Info**: Displays system status

### Debugging
If something doesn't work:
1. Open browser developer tools (F12)
2. Check the Console tab for error messages
3. Look for debug messages starting with "Loading configuration..."
4. Verify all JSON files are accessible

## Directory Structure

```
i18n-template/
├── index.html                 # Main application
├── embed.html                 # Embeddable version
├── test.html                  # Comprehensive test page
├── quick-test.html            # Quick theme test
├── README.md                  # Documentation
├── project-architecture.md    # Project documentation
├── src/
│   ├── style/
│   │   ├── variables.css      # CSS variables for theming
│   │   ├── reset.css          # CSS reset and normalize
│   │   ├── base.css           # Base styles and layout
│   │   └── components.css     # Reusable components
│   ├── script/
│   │   ├── i18n.js           # Internationalization system
│   │   ├── theme.js           # Theme switching logic
│   │   ├── counter.js         # Counter functionality
│   │   └── main.js            # Main application logic
│   ├── i18n/                  # Translation and configuration files
│   │   ├── base.json          # Common data (no duplication)
│   │   ├── config.json        # Global configuration
│   │   ├── en.json            # English translations
│   │   ├── es.json            # Spanish translations
│   │   ├── ru.json            # Russian translations
│   │   ├── fr.json            # French translations
│   │   └── de.json            # German translations
│   └── img/                   # Images directory
```

## Usage

### Standalone Application
Simply open `index.html` in any modern web browser. The application will:
1. Load common data from `src/i18n/base.json`
2. Load configuration from `src/i18n/config.json`
3. Load translations from JSON files in `src/i18n/`
4. Detect your browser language and system theme preference
5. Load with appropriate language and theme
6. Provide real-time text analysis as you type

### Embedding in Other Websites

#### Option 1: Iframe Embedding
```html
<iframe 
    src="embed.html" 
    width="100%" 
    height="500px" 
    frameborder="0"
    style="border: 1px solid #e0e0e0; border-radius: 8px;">
</iframe>
```

#### Option 2: Direct Integration
Copy the content from `embed.html` and integrate it directly into your HTML page:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
    <!-- Your existing styles -->
</head>
<body>
    <!-- Your existing content -->
    
    <!-- Embed the text analyzer -->
    <div class="text-analyzer-embed">
        <!-- Copy the entire content from embed.html here -->
    </div>
    
    <!-- Your existing content -->
</body>
</html>
```

## Technical Implementation

### Glass Morphism Design
- **Translucent backgrounds**: Semi-transparent glass effect
- **Backdrop blur**: Modern blur effects for depth
- **Subtle borders**: Light borders for definition
- **Smooth shadows**: Layered shadow effects
- **Responsive design**: Works on all screen sizes
- **Theme-aware**: Different glass effects for light/dark themes

### Base Data System
- **`base.json`**: Contains all common data shared across languages
- **No duplication**: Language buttons, theme icons, storage keys, etc. defined once
- **Inheritance system**: All JSON files can extend `base.json`
- **Automatic merging**: JavaScript automatically merges base data with language-specific data

### Configuration System
- **Centralized config**: All settings in `src/i18n/config.json`
- **No hardcoded values**: Everything configurable via JSON
- **Dynamic loading**: Configuration loaded at runtime
- **Fallback system**: Sensible defaults if config fails to load

### I18n System
- Uses `<span data-i18n="key">Default text</span>` pattern in HTML
- JavaScript updates text content based on selected language
- **External JSON files**: All translations stored in `src/i18n/` directory
- **Dynamic loading**: Translations fetched asynchronously on page load
- **Nested translation support**: Supports nested keys like `language_buttons.en`
- **No hardcoded values**: All text comes from JSON files
- **Base inheritance**: Common data shared via `base.json`
- **Dropdown selector**: Clean language selection interface

### Theme System
- CSS custom properties (variables) for dynamic theming
- `data-theme` attribute controls theme switching
- System preference detection using `prefers-color-scheme`
- Smooth transitions between themes
- **Configurable icons**: Theme icons defined in JSON
- **Glass morphism**: Modern translucent design

### Text Analysis
- Real-time event listeners on textarea input
- Efficient word counting algorithm
- Character counting with and without spaces
- Responsive grid layout for statistics display
- **Configurable events**: Analysis events defined in JSON

## Browser Compatibility

- **Modern browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **CSS Grid**: Used for responsive statistics layout
- **CSS Custom Properties**: Used for theme system
- **Backdrop Filter**: Used for glass morphism effects
- **localStorage**: Used for preference persistence
- **Fetch API**: Used for loading JSON files

## Customization

### Adding New Languages
1. Create a new JSON file in `src/i18n/` (e.g., `it.json`)
2. Add `"extends": "base.json"` to inherit common data
3. Add only language-specific translations
4. Add the language to `supported_languages` in `base.json`
5. Add language name to `language_names` in `base.json`
6. Add language option to the HTML select dropdown

Example:
```json
// src/i18n/it.json
{
    "extends": "base.json",
    "app_title": "Analizzatore di Testo",
    "enter_text": "Inserisci il tuo testo",
    "text_placeholder": "Scrivi o incolla il tuo testo qui...",
    "word_count": "Conteggio parole",
    "char_count_with_spaces": "Conteggio caratteri con spazi",
    "char_count_without_spaces": "Conteggio caratteri senza spazi",
    "light_theme": "Tema chiaro",
    "dark_theme": "Tema scuro",
    "theme_toggle": "Cambia tema"
}
```

### Modifying Common Data
Edit `src/i18n/base.json` to change:
- Language button labels
- Language names for dropdown
- Theme icons
- Storage keys
- Default values
- UI settings

### Modifying Configuration
Edit `src/i18n/config.json` to change:
- Supported languages
- Theme names
- Text analysis events
- Responsive breakpoints

### Modifying Glass Morphism Design
Edit the CSS custom properties in `src/style/variables.css`:

```css
:root {
    --glass-bg: rgba(255, 255, 255, 0.25);
    --glass-border: rgba(255, 255, 255, 0.18);
    --glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    --backdrop-blur: blur(10px);
}

[data-theme="dark"] {
    --glass-bg: rgba(33, 37, 41, 0.25);
    --glass-border: rgba(248, 249, 250, 0.18);
    --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    --backdrop-blur: blur(10px);
}
```

### Adding New Statistics
1. Add new HTML element for the statistic
2. Add corresponding JavaScript logic in the `TextAnalyzer` class
3. Add translations for the new statistic label to all JSON files

## Performance Features

- **Lightweight**: No external dependencies
- **Efficient**: Real-time updates without performance impact
- **Responsive**: Mobile-first design
- **Accessible**: Semantic HTML and keyboard navigation support
- **Cached configuration**: JSON files can be cached by browsers
- **No hardcoded values**: Everything configurable and maintainable
- **No data duplication**: Common data shared via base.json
- **Modern design**: Glass morphism with smooth animations

## Troubleshooting

### Theme Not Switching
1. Check browser console for errors
2. Verify `theme.js` is loaded correctly
3. Ensure `data-theme` attribute is set on `<html>` element
4. Check if localStorage is available

### Languages Not Loading
1. Verify all JSON files exist in `src/i18n/`
2. Check network tab for failed requests
3. Ensure `base.json` is loaded first
4. Verify `extends` property in language files

### Glass Effect Not Working
1. Check if browser supports `backdrop-filter`
2. Verify CSS variables are defined
3. Ensure `data-theme` attribute is set correctly

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application. 