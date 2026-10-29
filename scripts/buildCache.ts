import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { games } from "../shared/games.ts";
import { gameBuildKey } from "./lib/gameBuild.ts";

const root = resolve(import.meta.dirname, "..");
const hash = createHash("sha256");
for (const game of games) hash.update(gameBuildKey(root, game));
console.log(hash.digest("hex"));
