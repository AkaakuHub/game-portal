import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { run } from "./run.ts";

type Game = Readonly<{ slug: string; directory: string }>;

export function gameBuildKey(root: string, game: Game): string {
  const hash = createHash("sha256").update(game.slug).update(process.version);
  const inputs = execFileSync(
    "git",
    [
      "ls-files",
      "--stage",
      "--",
      ".",
      ":(glob,exclude)**/*.md",
      ":(glob,exclude)docs/**",
      ":(glob,exclude)tests/**",
      ":(glob,exclude)**/*.test.*",
      ":(glob,exclude)**/*.spec.*",
      ":(glob,exclude).github/**",
      ":(exclude)lefthook.yml",
    ],
    { cwd: resolve(root, game.directory) },
  );
  hash.update(inputs);
  for (const file of ["pnpm-lock.yaml", "pnpm-workspace.yaml", "scripts/lib/gameBuild.ts"])
    hash.update(readFileSync(resolve(root, file)));
  return hash.digest("hex");
}

export function buildGame(root: string, game: Game): void {
  const cache = resolve(root, ".build/games", game.slug);
  const keyFile = resolve(root, ".build/keys", `${game.slug}.txt`);
  const key = gameBuildKey(root, game);
  const reusable =
    process.env.GITHUB_ACTIONS === "true" &&
    existsSync(keyFile) &&
    existsSync(resolve(cache, "index.html")) &&
    readFileSync(keyFile, "utf8") === key;
  if (reusable) console.log(`${game.slug}: 前回のビルドを再利用します。`);
  else {
    run([
      {
        cwd: resolve(root, game.directory),
        args: [
          "exec",
          "vp",
          "build",
          "--base",
          `/${game.slug}/`,
          "--outDir",
          cache,
          "--emptyOutDir",
        ],
      },
    ]);
    mkdirSync(resolve(root, ".build/keys"), { recursive: true });
    writeFileSync(keyFile, key);
  }
  cpSync(cache, resolve(root, "dist", game.slug), { recursive: true });
}
