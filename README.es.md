# Text Analyzer Archive

[English](README.md) | Español | [Русский](README.ru.md)

Text Analyzer Archive es una edición archivada y ligera para el navegador de un contador de texto, con una página independiente para incrustar.

## Propósito

Ofrecer una interfaz autónoma para contar texto, para uso independiente o para incluirla mediante la página de inserción suministrada.

## Dirección web

[text-analyzer-archive.d9911.org](https://text-analyzer-archive.d9911.org/)

## Funciones confirmadas

- Cuenta palabras, caracteres con espacios y caracteres sin espacios mientras cambia el texto.
- Se actualiza en los eventos de entrada, pegado y liberación de tecla configurados en `src/i18n/config.json`.
- Proporciona `index.html` para la interfaz completa y `embed.html` para la versión compacta.
- Carga la configuración y las traducciones desde JSON, con datos de reserva integrados en el código de la aplicación.

## Uso

1. Abre la aplicación completa o la página de inserción.
2. Selecciona un idioma de interfaz si lo necesitas.
3. Escribe o pega texto y consulta los tres contadores.

## Inicio local

La configuración y las traducciones se cargan con `fetch`; por ello, sirve el repositorio mediante HTTP:

```bash
python3 -m http.server 8000
```

Abre [http://localhost:8000](http://localhost:8000).

## Estructura

- `index.html` es la interfaz autónoma; `embed.html` es la variante compacta para insertar.
- `src/script/` contiene la carga de configuración, localización, tema, conteo e inicialización de la aplicación.
- `src/i18n/` contiene datos base, configuración y archivos JSON de idiomas.
- `src/style/` y `src/img/` contienen estilos locales, iconos y el manifiesto.

## Internacionalización y temas

La configuración incluye inglés, español, ruso, francés y alemán. La aplicación guarda las preferencias de idioma y tema en el almacenamiento local, detecta un idioma compatible del navegador cuando no hay una preferencia guardada y proporciona temas claro y oscuro.

## Despliegue

`wrangler.jsonc` declara la aplicación `text-analyzer-archive` y sirve recursos estáticos desde la raíz del repositorio (`.`).

## Tecnología

HTML estático, CSS y JavaScript de navegador; no hay manifiesto de paquetes en la raíz del repositorio.

## Licencia

Consulta [LICENSE](LICENSE) para el texto completo de la licencia y los términos específicos del proyecto.

## Autor

[Denis Gutsuliak](https://d9911.org/)
