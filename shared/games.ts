interface Game {
  slug: string;
  title: string;
  directory: string;
  port: number;
}
export const games: readonly Game[] = [
  { slug: "suikomanai", title: "#吸い込まないでっ", directory: "games/suikomanai", port: 4175 },
];
