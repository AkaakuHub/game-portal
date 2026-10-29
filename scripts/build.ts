import { resolve } from "node:path";
import { games } from "../shared/games.ts";
import { run } from "./lib/run.ts";
import { buildGame } from "./lib/gameBuild.ts";
import { publishPages } from "./lib/publishPages.ts";

const root = resolve(import.meta.dirname, "..");
run([{ cwd: root, args: ["exec", "vp", "build"] }]);
for (const game of games) buildGame(root, game);
publishPages(resolve(root, "dist"));
