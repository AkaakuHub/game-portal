import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { publishGraphics } from "./graphics.ts";
import { escapeHtml, pages, site, socialImagePath } from "../../shared/site.ts";

export function publishPages(directory: string): void {
  publishGraphics(directory);
  for (const page of pages) {
    const filename = resolve(directory, `.${page.path}`, "index.html");
    const url = site.origin + page.path;
    const image = site.origin + socialImagePath(page.path);
    const metadata = [
      `<title>${escapeHtml(page.title)}</title>`,
      `<meta name="description" content="${escapeHtml(page.description)}">`,
      '<meta name="robots" content="index, follow, max-image-preview:large">',
      `<link rel="canonical" href="${url}">`,
      '<meta property="og:type" content="website">',
      '<meta property="og:locale" content="ja_JP">',
      `<meta property="og:site_name" content="${site.name}">`,
      `<meta property="og:title" content="${escapeHtml(page.title)}">`,
      `<meta property="og:description" content="${escapeHtml(page.description)}">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:image" content="${image}">`,
      '<meta property="og:image:type" content="image/png">',
      '<meta property="og:image:width" content="1200">',
      '<meta property="og:image:height" content="630">',
      `<meta property="og:image:alt" content="${escapeHtml(page.title)}">`,
      '<meta name="twitter:card" content="summary_large_image">',
      `<meta name="twitter:title" content="${escapeHtml(page.title)}">`,
      `<meta name="twitter:description" content="${escapeHtml(page.description)}">`,
      `<meta name="twitter:image" content="${image}">`,
      `<meta name="twitter:image:alt" content="${escapeHtml(page.title)}">`,
      '<link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">',
      '<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">',
      `<meta name="theme-color" content="${site.themeColor}">`,
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${site.measurementId}"></script>`,
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.measurementId}');</script>`,
    ];
    if (page.path === "/") {
      metadata.push(
        `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.origin + "/", inLanguage: "ja" })}</script>`,
      );
    }
    const html = readFileSync(filename, "utf8")
      .replace(/<title>[\s\S]*?<\/title>/, "")
      .replace(/<meta\s+name="(?:description|robots|theme-color)"[^>]*>/g, "")
      .replace("<head>", `<head>\n${metadata.join("\n")}`);
    writeFileSync(filename, html);
  }
  const urls = pages.map((page) => `<url><loc>${site.origin}${page.path}</loc></url>`).join("");
  writeFileSync(
    resolve(directory, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`,
  );
  writeFileSync(
    resolve(directory, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`,
  );
}
