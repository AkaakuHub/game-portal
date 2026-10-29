import { games } from "./games.ts";

export const site = {
  name: "あかあくの遊び場",
  origin: "https://game.akaaku.net",
  themeColor: "#08141f",
  measurementId: "G-JFYR362R3W",
};

export const pages = [
  {
    path: "/",
    title: "あかあくの遊び場｜無料ブラウザゲーム",
    description:
      "ダウンロード不要で遊べる無料ブラウザゲームを集めたあかあくの遊び場。気になるゲームを選んで、すぐに楽しめます。",
  },
  ...games.map((game) => ({
    path: `/${game.slug}/`,
    title: `${game.title} | ${site.name}`,
    description: game.description,
  })),
  {
    path: "/privacy/",
    title: `プライバシーポリシー | ${site.name}`,
    description: "アクセス解析とCookieの利用についてご案内します。",
  },
  {
    path: "/contact/",
    title: `お問い合わせ | ${site.name}`,
    description: "あかあくの遊び場へのお問い合わせ窓口です。",
  },
];

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function gameListHtml(): string {
  return games
    .map(
      (game) =>
        `<li><a class="game" href="/${game.slug}/"><img src="${game.thumbnail}" alt="" width="960" height="540" decoding="async"><span>${escapeHtml(game.title)}</span></a></li>`,
    )
    .join("");
}

export function socialImagePath(path: string): string {
  return `/og/${path === "/" ? "index" : path.slice(1, -1)}.png`;
}

export const gameNavigationScript = "/assets/game-navigation.js";
