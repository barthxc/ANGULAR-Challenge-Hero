export interface ListComicsResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Data;
}

export interface Data {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ComicsData[];
}

export interface ComicsData {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  path: string;
  extension: ComicExtension;
}

export enum ComicExtension {
  Jpg = 'jpg',
}
