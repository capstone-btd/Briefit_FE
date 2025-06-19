import { NewsSummary } from "@/types/news/newsSummary";

const allCategories = ["정치", "경제", "사회", "문화", "연예", "IT", "스포츠", "세계"];

function getRandomCategories(): string[] {
  const selected = allCategories.filter(() => Math.random() < 0.4); 
  return selected.length > 0
    ? selected
    : [allCategories[Math.floor(Math.random() * allCategories.length)]];
}

export const dummyNews: NewsSummary[] = Array.from({ length: 200 }, (_, i) => ({
  articleId: i + 1,
  categories: getRandomCategories(),
  title: `AI 기술로 변화하는 글로벌 뉴스 산업 (${i + 1})`,
  body: "최근 인공지능 기술의 발전으로 뉴스 제작과 편집 과정이 자동화되고 있습니다. 특히 요약, 번역, 추천 시스템에서 두각을 나타내고 있습니다.",
  imageUrl:
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
  pressCompanies: ["한국일보", "중앙일보", "국민일보"],
  scrapId: -1,
  isCustomized: false
}));
