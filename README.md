# Snorz Website

The public product, support, and privacy website for Snorz.

## Pages

- Product: `https://snorz.ajigu.com/`
- Support: `https://snorz.ajigu.com/support/`
- Privacy: `https://snorz.ajigu.com/privacy/`

The site is a dependency-free static build deployed from the `main` branch through GitHub Pages.

## Locales

The product, support, and privacy pages are available for:

- English (US) at the root paths
- English (UK) at `/en-gb/`
- Simplified Chinese at `/zh-hans/`
- Traditional Chinese at `/zh-hant/`
- Japanese at `/ja/`
- Korean at `/ko/`
- German at `/de/`
- French at `/fr/`

Run `node scripts/generate-locales.mjs` to regenerate the localized static pages and multilingual sitemap from the English pages.

Run `node scripts/validate-site.mjs` to validate locale metadata, internal links, page structure, and sitemap coverage.
