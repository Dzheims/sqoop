export interface article {
  source: source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface source {
  id: string;
  name: string;
}
