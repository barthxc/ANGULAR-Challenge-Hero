export interface Hero {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  comics: Comics;
}

export interface Comics {
  available: number;
  collectionURI: string;
  items: ComicsItem[];
  returned: number;
}

export interface ComicsItem {
  resourceURI: string;
  name: string;
}

export interface Thumbnail {
  path: string;
  extension: Extension;
}

export enum Extension {
  GIF = 'gif',
  Jpg = 'jpg',
}
