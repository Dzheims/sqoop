export interface Article {
  author: string | null;
  title: string | null;
  description: string | null;
  url: string | null;
  urlToImage: string | null;
  publishedAt: string | null;
  content: string | null;
  sourceId: string | null;
  sourceName: string | null;
  suggestedKeywords: [string];
}

export interface source {
  id: string;
  name: string;
  description: string | null;
  url: string | null;
  category: string | null;
  language: string | null;
  country: string | null;
}
