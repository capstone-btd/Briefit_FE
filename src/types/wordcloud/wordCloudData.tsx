type WordScore = {
    word: string,
    score: number,
}

export type WordCloudData = {
    words: WordScore[],
    createdAt: string
}