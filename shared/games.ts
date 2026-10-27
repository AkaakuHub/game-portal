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
];
