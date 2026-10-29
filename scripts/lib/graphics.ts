import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { escapeHtml, pages, site, socialImagePath } from "../../shared/site.ts";

export function publishGraphics(directory: string): void {
  const root = resolve(import.meta.dirname, "../..");
  const icon = readFileSync(resolve(root, "apps/portal/public/favicon.svg"), "utf8");
  writeFileSync(
    resolve(directory, "apple-touch-icon.png"),
    new Resvg(icon, { fitTo: { mode: "width", value: 180 } }).render().asPng(),
  );
  mkdirSync(resolve(directory, "og"), { recursive: true });
  for (const page of pages) {
    const title = page.path === "/" ? site.name : page.title.split(" | ")[0];
    if (!title) throw new Error("OGP画像のタイトルがありません。");
    const lines = Array.from(title).reduce<string[]>((result, char, index) => {
      const line = Math.floor(index / 14);
      result[line] = (result[line] ?? "") + char;
      return result;
    }, []);
    const text = lines
      .map(
        (line, index) =>
          `<text x="80" y="${320 + index * 86}" font-size="68" font-weight="700">${escapeHtml(line)}</text>`,
      )
      .join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="${site.themeColor}"/>
      <rect x="32" y="32" width="1136" height="566" rx="32" fill="#112b3b" stroke="#8ae6ff" stroke-opacity="0.3"/>
      ${icon.replace("<svg ", '<svg x="944" y="72" width="144" height="144" ')}
      <g fill="#eefbff" font-family="Noto Sans JP">
        ${page.path === "/" ? "" : `<text x="80" y="124" font-size="34">${site.name}</text>`}
        ${text}
        <text x="80" y="550" font-size="30" fill="#8ae6ff">game.akaaku.net</text>
      </g>
    </svg>`;
    const image = new Resvg(svg, {
      font: { loadSystemFonts: false, fontFiles: [resolve(root, "assets/fonts/NotoSansJP.ttf")] },
    })
      .render()
      .asPng();
    writeFileSync(resolve(directory, `.${socialImagePath(page.path)}`), image);
  }
}
