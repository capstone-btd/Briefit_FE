import { newsCategories } from "@/constants/newsCategries";
import NewsCategorybar from "@/features/common/NewsCategorybar";
import TodayIssue from "@/features/today-news/components/TodayIssue";
import TodayNewsCardGrid from "@/features/today-news/components/TodayNewsCardGrid";
import fetchNewsCardList from "@/features/today-news/api/news";

type Props = {
  params: {
    category: string;
  };
};

export default async function TodayNewsPage({ params }: Props) {
  const { category } = await params;
  const categoryLabel =
    newsCategories.find((e) => e.name == category)?.label ?? null; // '전체'는 null 값으로 전달
  const newsSummaryList = await fetchNewsCardList({
    selectedCategory: categoryLabel ?? "전체",
  });
  return (
    <div>
      <div className="flex items-center space-x-50">
        <div className="font-title-24">오늘의 AI 뉴스</div>
        <NewsCategorybar />
      </div>
      <div>
        <TodayNewsCardGrid
          newsSummaryList={newsSummaryList}
          categoryLabel={categoryLabel}
          className="mt-30"
        />
      </div>
      <div className="mt-70">
        <TodayIssue />
      </div>
    </div>
  );
}
