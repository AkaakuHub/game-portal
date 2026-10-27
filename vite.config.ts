import { defineConfig } from "vite-plus";
import { games } from "./shared/games";

export default defineConfig({
  server: {
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
