export type NewsSummary = {
    articleId: number,
    title: string,
    body: string, 
    imgUrls: string[],
    categories: string[],
    pressCompanies: string[]
    scrapId: number,
    isCustomized: boolean,
}