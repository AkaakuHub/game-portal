import { resolve } from "node:path";
import { games } from "../shared/games.ts";
import { run } from "./lib/run.ts";
import { publishPages } from "./lib/publishPages.ts";

const root = resolve(import.meta.dirname, "..");
run([
  { cwd: root, args: ["exec", "vp", "build"] },
  ...games.map((game) => ({
    cwd: resolve(root, game.directory),
    args: [
      "exec",
      "vp",
      "build",
      "--base",
      `/${game.slug}/`,
      "--outDir",
      resolve(root, "dist", game.slug),
      "--emptyOutDir",
    ],
  })),
]);

publishPages(resolve(root, "dist"));
