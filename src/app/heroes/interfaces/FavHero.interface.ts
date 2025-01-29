export interface FavHero {
  id: number;
  name: string;
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  path: string;
  extension: Extension;
}

export enum Extension {
  GIF = 'gif',
  Jpg = 'jpg',
}
