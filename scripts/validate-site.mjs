import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const locales = [
  ["en-US", ""], ["en-GB", "en-gb"], ["zh-Hans", "zh-hans"], ["zh-Hant", "zh-hant"],
  ["ja", "ja"], ["ko", "ko"], ["de", "de"], ["fr", "fr"],
];
const pages = ["", "support", "privacy"];
const failures = [];

const fileFor = (route, page) => path.join(root, route, page, "index.html");

for (const [locale, route] of locales) {
  for (const page of pages) {
    const file = fileFor(route, page);
    const label = path.relative(root, file);
    let html;
    try {
      html = await readFile(file, "utf8");
    } catch {
      failures.push(`${label}: missing page`);
      continue;
    }

    const assertions = [
      [html.includes(`<html lang="${locale}" data-locale="${locale}">`), "locale marker"],
      [(html.match(/<link rel="alternate"/g) || []).length === 9, "nine alternate links"],
      [(html.match(/<link rel="canonical"/g) || []).length === 1, "one canonical link"],
      [(html.match(/<meta property="og:url"/g) || []).length === 1, "one Open Graph URL"],
      [html.includes('<script src="/language.js" defer></script>'), "language script"],
      [html.includes(`data-language="${locale}"`) && html.includes('aria-current="page"'), "current language"],
      [html.includes("<body>") && html.includes("</body>"), "body structure"],
    ];
    for (const [passed, message] of assertions) {
      if (!passed) failures.push(`${label}: expected ${message}`);
    }

    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const reference = match[1];
      if (!reference.startsWith("/") || reference.startsWith("//")) continue;
      const pathname = reference.split(/[?#]/)[0];
      const target = pathname.endsWith("/") ? path.join(root, pathname, "index.html") : path.join(root, pathname);
      try {
        await access(target);
      } catch {
        failures.push(`${label}: missing internal target ${pathname}`);
      }
    }
  }
}

const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
if ((sitemap.match(/<url>/g) || []).length !== 24) failures.push("sitemap.xml: expected 24 URLs");
if ((sitemap.match(/xhtml:link/g) || []).length !== 216) failures.push("sitemap.xml: expected 216 alternate links");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Validated 24 localized pages and the multilingual sitemap.");
}
