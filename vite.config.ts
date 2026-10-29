import { resolve } from "node:path";
import { defineConfig } from "vite-plus";
import { games } from "./shared/games";
import { gameListHtml, gameNavigationScript } from "./shared/site.ts";

const root = import.meta.dirname;

export default defineConfig({
  root: resolve(root, "apps/portal"),
  plugins: [
    {
      name: "portal-game-list",
      transformIndexHtml(html) {
        return html.replace('<ul id="games"></ul>', `<ul id="games">${gameListHtml()}</ul>`);
      },
    },
  ],
  build: {
    outDir: resolve(root, "dist"),
    emptyOutDir: true,
    rolldownOptions: {
      output: {
        entryFileNames: (chunk) =>
          chunk.name === "gameNavigation"
            ? gameNavigationScript.slice(1)
            : "assets/[name]-[hash].js",
      },
      input: {
        index: resolve(root, "apps/portal/index.html"),
        privacy: resolve(root, "apps/portal/privacy/index.html"),
        contact: resolve(root, "apps/portal/contact/index.html"),
        gameNavigation: resolve(root, "apps/portal/src/gameNavigation.ts"),
      },
    },
  },
  server: {
    allowedHosts: ["vcn-tokyo-main.tail4c0963.ts.net"],
    host: "127.0.0.1",
    port: 4174,
    strictPort: true,
    proxy: Object.fromEntries(
      games.map((game) => [
        `/${game.slug}`,
        { target: `http://127.0.0.1:${game.port}`, changeOrigin: true, ws: true },
      ]),
    ),
  },
  preview: { host: "127.0.0.1", port: 4174, strictPort: true },
  lint: {
    options: { typeAware: false },
    rules: { "max-lines": ["error", { max: 350, skipBlankLines: true, skipComments: true }] },
  },
});
