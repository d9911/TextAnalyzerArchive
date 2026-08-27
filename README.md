# Text Analyzer Archive

English | [Español](README.es.md) | [Русский](README.ru.md)

Text Analyzer Archive is a lightweight archived browser edition of a text counter, with a separate embeddable page.

## Purpose

Provide a self-contained text-counting interface for standalone use or inclusion through the supplied embed page.

## Web address

[text-analyzer-archive.d9911.org](https://text-analyzer-archive.d9911.org/)

## Confirmed features

- Counts words, characters with whitespace, and characters without whitespace as text changes.
- Updates on input, paste, and keyup events configured in `src/i18n/config.json`.
- Provides `index.html` for the full interface and `embed.html` for the compact version.
- Loads configuration and translations from JSON, with built-in fallback data in the application code.

## Use

1. Open the full application or the embed page.
2. Select an interface language if needed.
3. Type or paste text and read the three counters.

## Local start

Configuration and translations are loaded with `fetch`, so serve the repository over HTTP:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Structure

- `index.html` is the standalone interface; `embed.html` is the compact embed variant.
- `src/script/` contains configuration loading, localization, theme, counting, and application initialization.
- `src/i18n/` contains base data, configuration, and language JSON files.
- `src/style/` and `src/img/` contain local styles, icons, and the manifest.

## Internationalization and themes

The configuration lists English, Spanish, Russian, French, and German. The application stores language and theme preferences in local storage, detects a supported browser language when no preference is stored, and provides light and dark themes.

## Deployment

`wrangler.jsonc` declares the `text-analyzer-archive` application and serves static assets from the repository root (`.`).

## Technology

Static HTML, CSS, and browser JavaScript; no package manifest is present in the repository root.

## License

See [LICENSE](LICENSE) for the complete license text and project-specific terms.

## Author

[Denis Gutsuliak](https://d9911.org/)
