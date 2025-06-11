import { NewsSummary } from "@/types/news/newsSummary";
import fetchRecommendedNewsCardList from "../api/news";
import { dummyNews } from "@/mock/dummyNews";
import RecommendedNewsCardList from "./RecommendedNewsCardList";

export default async function RecommendedNews() {
    const newsList = (await fetchRecommendedNewsCardList({
      selectedCategory: "전체",
    })) as NewsSummary[];

  const newsByCategory: Record<string, NewsSummary[]> = {};

  for (const news of newsList) {
    const category = news.categories[0];

    if (!newsByCategory[category]) {
      newsByCategory[category] = [news];
    } else if (newsByCategory[category].length < 14) {
      newsByCategory[category].push(news);
    }
  }

  // 카테고리 정렬 (가나다순)
  const sortdCategories = Object.keys(newsByCategory).sort((a, b) =>
    a.localeCompare(b, "ko"),
  );
    
  return (
    <div>
      {sortdCategories.map((category, index) => (
        <RecommendedNewsCardList
          key={index}
          category={category}
          newsList={newsByCategory[category]}
        />
      ))}
    </div>
  );
}
