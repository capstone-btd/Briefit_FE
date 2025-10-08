import RefreshOnBackWrapper from "@/components/RefreshOnBackWrapper";
import { newsCategories } from "@/constants/newsCategries";
import NewsCategorybar from "@/features/common/categorybar/NewsCategorybar";
import PressCompanyFilterWrapper from "@/features/common/PressCompanyFilterWrapper";
import TodayIssue from "@/features/today-news/components/TodayIssue";
import TodayNewsCardGrid from "@/features/today-news/components/TodayNewsCardGrid";
import { use } from "react";

type Props = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default function TodayNewsPage(props: Props) {
  const { category } = use(props.params);
  const searchParams = use(props.searchParams);

  const selectedPressCompanyName = (searchParams.company as string) || "전체";
  const categoryLabel = category
    ? (newsCategories.find((e) => e.name === category[0])?.label ?? null)
    : null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="scrollbar-hide flex items-center space-x-50 overflow-x-auto">
          <div className="font-title-24 sm:hidden">오늘의 AI 뉴스</div>
          <NewsCategorybar basePath="today-news" />
        </div>
        {/* TODO: - 수정 필요 */}
        <div className="sm:hidden"><PressCompanyFilterWrapper /></div> 
      </div>
      <div>
        <RefreshOnBackWrapper>
          <TodayNewsCardGrid
            categoryLabel={categoryLabel}
            selectedPressCompanyName={selectedPressCompanyName}
            className="mt-30"
          />
        </RefreshOnBackWrapper>
      </div>
      <div className="mt-70 sm:hidden">
        <TodayIssue />
      </div>
    </div>
  );
}
