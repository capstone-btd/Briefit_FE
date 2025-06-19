export type NewsSummary = {
  articleId: number;
  scrapId: number | null;
  isCustomize: boolean;
  title: string;
  body: string;
  categories: string[];
  pressCompanies: string[];
  imgUrls: string[];
  backgroudColor: string | null;
  createdAt: string;
};
