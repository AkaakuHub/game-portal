interface Game {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  directory: string;
  port: number;
}
export const games: readonly Game[] = [
  {
    slug: "suikomanaide",
    title: "#吸い込まないでっ",
    description:
      "排水口への吸い込みを避けながら進む無料ブラウザゲーム。ダウンロード不要で遊べます。",
    thumbnail: "/thumbnails/suikomanaide.webp",
    directory: "games/suikomanaide",
    port: 4175,
  },
  {
    slug: "star-getter",
    title: "ラブゲッター",
    description:
      "カードを組み合わせてスターを集める無料ブラウザゲーム。デッキを編成し、自分の組み合わせでスコアを伸ばそう。",
    thumbnail: "/thumbnails/star-getter.png",
    directory: "games/star-getter",
    port: 4176,
  },
];
