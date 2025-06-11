import { DetailPageType } from "@/constants/detailPageType";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import fetchRecommendedNewsCardList from "../api/news";

const ITEMS_PER_PAGE = 6;

export default async function RecommendedNewsCardGrid({
  categoryLabel,
  className,
}: {
  categoryLabel: string;
  className?: string;
  }) {

  const newsList = await fetchRecommendedNewsCardList({ selectedCategory: categoryLabel });
  return (
    <div className="mt-45">
      <PaginatedNewsCardGrid
        newsList={newsList}
        itemsPerPage={ITEMS_PER_PAGE}
        categoryLabel={categoryLabel}
        type={DetailPageType.TODAY}
        className={className}
      />
    </div>
  );
}
