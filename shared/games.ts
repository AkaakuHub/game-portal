interface Game {
  slug: string;
  title: string;
  thumbnail: string;
  directory: string;
  port: number;
}
export const games: readonly Game[] = [
  {
    slug: "suikomanai",
    title: "#吸い込まないでっ",
    thumbnail: "/thumbnails/suikomanai.webp",
    directory: "games/suikomanai",
    port: 4175,
  },
];
