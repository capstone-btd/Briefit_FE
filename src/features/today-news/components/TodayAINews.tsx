import { NewsCard } from "@/features/common/NewsCard";
import NewsCategorybar from "@/features/common/NewsCategorybar";
import { DetailPageType } from "@/constants/detailPageType";
import { NewsSummary } from "@/types/news/newsSummary";

export default function TodayAINews({
  categoryLabel,
}: {
  categoryLabel: string;
  }) {
  
  const dummyNews: NewsSummary[] = Array.from({ length: 9 }, (_, i) => ({
    articleId: i + 1,
    categories: ["정치", "경제"],
    title: `AI 기술로 변화하는 글로벌 뉴스 산업 (${i + 1})`,
    body: "최근 인공지능 기술의 발전으로 뉴스 제작과 편집 과정이 자동화되고 있습니다. 특히 요약, 번역, 추천 시스템에서 두각을 나타내고 있습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    pressCompanies: ["한국일보", "중앙일보", "국민일보"],
  }));

  return (
    <div className="space-y-30">
      <div className="flex items-center space-x-50">
        <div className="font-title-24">오늘의 AI 뉴스</div>
        <NewsCategorybar />
      </div>

      {/* 뉴스 카드 그리드*/}
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {dummyNews.map((_, index) => (
          <NewsCard
            key={index}
            type={DetailPageType.TODAY}
            categoryLabel={categoryLabel}
            newsSummary={_}
          />
        ))}
      </div>
    </div>
  );
}
