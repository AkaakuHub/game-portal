import { resolve } from "node:path";
import { games } from "../shared/games.ts";
import { run } from "./lib/run.ts";

const root = resolve(import.meta.dirname, "..");
run([
  ...["typecheck", "lint", "format:check"].map((name) => ({ cwd: root, args: [name] })),
  ...games.map((game) => ({ cwd: resolve(root, game.directory), args: ["check"] })),
]);
