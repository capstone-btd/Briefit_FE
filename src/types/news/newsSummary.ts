export type NewsSummary = {
    articleId: number,
    title: string,
    body: string, 
    imageUrl: string,
    categories: string[],
    pressCompanies: string[]
    scrapId: number,
    isCustomized: boolean,
}