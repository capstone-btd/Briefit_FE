export type NewsSource = {
  sourceTitle: string;
  pressCompany: string;
  url: string;
}

export type NewsData = {
  title: string;
  body: string;
  categories: string[]; 
  sources: NewsSource[];
  imgUrls: string[];
  createdAt: string;
}
