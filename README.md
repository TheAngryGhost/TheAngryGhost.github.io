# Casper Turek Personal Website

This is a static personal website for Casper Turek. It presents selected software, robotics, and audio engineering projects with context, screenshots, and links to live pages or source repositories.

The site is intentionally small: plain HTML pages, shared CSS, and custom elements written in plain JavaScript with Ellipsi. Webpack builds the JavaScript bundle used by the pages.

## Structure

- `index.html` is the home page.
- `src/pages/` contains standalone project pages.
- `src/scripts/` contains the JavaScript entry point, component loader, and custom elements.
- `src/styles/` contains the shared stylesheet.
- `assets/` contains media files such as logos, banners, screenshots, and photos.
- `dist/` contains the compiled JavaScript bundle.

## Build

Install dependencies:

```bash
npm install
```

Build the JavaScript bundle:

```bash
npm run build
```

The build outputs `dist/main.bundle.js`, which is loaded by the static HTML pages.

## Notes

This project avoids heavy frontend frameworks so the pages stay easy to inspect, edit, and publish. Shared navigation, footer, hero sections, and visual effects are implemented as custom elements.
