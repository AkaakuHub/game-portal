interface Game {
  slug: string;
  title: string;
  thumbnail: string;
  directory: string;
  port: number;
}
export const games: readonly Game[] = [
  {
    slug: "suikomanaide",
    title: "#吸い込まないでっ",
    thumbnail: "/thumbnails/suikomanaide.webp",
    directory: "games/suikomanaide",
    port: 4175,
  },
  {
    slug: "star-getter",
    title: "star-getter",
    thumbnail: "/thumbnails/star-getter.png",
    directory: "games/star-getter",
    port: 4176,
  },
];
