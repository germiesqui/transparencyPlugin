import { Url } from 'url';

export interface IBasicData {
    authors: string[];
    publishDate: Date;
    keywords: string[];
    summary: string;
    text: string;
    topImg: Url;
    movies: Url[];
  }
  