"use client";

import React from "react";
import { DetailPageType } from "@/constants/detailPageType";
import { NewsCard } from "@/features/common/NewsCard";
import { MoreCardButton } from "@/features/common/MoreCardButton";
import { newsCategories } from "@/constants/newsCategries";
import { NewsSummary } from "@/types/news/newsSummary";

export default function RecommendedNewsCardList({
  category,
  newsList
}: {
    category: string;
    newsList: NewsSummary[];
}) {
  const categoryLabel =
    newsCategories.find((cat) => cat.label === category)?.name ?? "";

  return (
    <div className="mb-30 w-screen">
      <div className="font-title-20 text-gray-500">{category}</div>
      <div
        className="mt-30 flex gap-20 overflow-x-scroll p-2 mr-20"
        style={{
          scrollbarWidth: "thin",
        //   msOverflowStyle: "none",
        }}
      >
        {newsList.map((news, index) => (
          <NewsCard
            key={index}
            type={DetailPageType.RECOMMENDED}
            categoryLabel={category}
            newsSummary={news}
            className="w-[25vw]"
          />
        ))}

        {newsList.length >= 14 && (
          <MoreCardButton
            type={DetailPageType.RECOMMENDED}
            categoryLabel={categoryLabel}
            className="w-[25vw]"
          />
        )}
      </div>
    </div>
  );
}
