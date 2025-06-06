import { NewsCard } from "@/features/common/NewsCard";
import NewsCategorybar from "@/features/common/NewsCategorybar";
import { DetailPageType } from "@/constants/detailPageType";

export default function TodayAINews({
  categoryLabel,
}: {
  categoryLabel: string;
}) {
  const dummyNews = Array.from({ length: 9 }); // 예시용 뉴스 카드
  
  return (
    <div className="space-y-30">
      {/* 헤더 */}
      <div className="flex items-center space-x-50">
        <div className="font-title-20 text-xl sm:text-2xl">오늘의 AI 뉴스</div>
        <NewsCategorybar />
      </div>

      {/* 뉴스 카드 그리드*/}
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {dummyNews.map((_, index) => (
          <NewsCard key={index} newsId={index} categoryLabel={categoryLabel} type={DetailPageType.TODAY} />
        ))}
      </div>
    </div>
  );
}
