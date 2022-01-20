export interface Tweet {
  tweetId: string;
  authorId: string;
  publishedAt: string;
  text: string;
  name: string;
  profileImageUrl: string;
  username: String;
  verified: Boolean;
  photos: [TwitterPhoto];
  suggestedKeywords: [String];
}

export interface TwitterPhoto {
  mediaKey: String;
  type: String;
  url: String;
}
