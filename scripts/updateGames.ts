import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { games } from "../shared/games.ts";

const cwd = resolve(import.meta.dirname, "..");
const paths = games.map((game) => game.directory);
for (const args of [
  ["submodule", "update", "--init", "--remote", "--checkout", "--", ...paths],
  ["submodule", "update", "--init", "--recursive", "--", ...paths],
  ["submodule", "status", "--recursive"],
])
  execFileSync("git", args, { cwd, stdio: "inherit" });
