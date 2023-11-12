export type PosterSize = 92 | 154 | 185 | 342 | 500 | 780;
export type BackdropSize = 300 | 780 | 1280;

export function getImageUrl(_type: 'poster', path: string, width: PosterSize): string;
export function getImageUrl(_type: 'backdrop', path: string, width: BackdropSize): string;
export function getImageUrl(_type: string, path: string, width: number): string {
  const imgPath = path.replace(/^\//, '');
  return `https://image.tmdb.org/t/p/w${width}/${imgPath}`;
}
