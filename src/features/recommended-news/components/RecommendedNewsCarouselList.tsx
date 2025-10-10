"use client";

import { DetailPageType } from "@/constants/detailPageType";
import { NewsSummary } from "@/types/news/newsSummary";
import { NewsCarousel } from "@/features/common/NewsCarousel";

export default function RecommendedNewsCarouselList({
  category,
  newsList,
}: {
  category: string;
  newsList: NewsSummary[];
}) {
  return (
    <div className="mb-30">
      <div className="mb-10 font-title-16 text-gray-500">{category}</div>
        <NewsCarousel
          type={DetailPageType.RECOMMENDED}
          categoryLabel={category}
          newsList={newsList}
        /> 
    </div>
  );
}
