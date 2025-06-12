import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import SignUpModal from "@/features/signup/components/SignUpModal";
import { DetailPageType } from "@/constants/detailPageType";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import { NewsSummary } from "@/types/news/newsSummary";
import fetchNewsCardList from "../api/news";
import { dummyNews } from "@/mock/dummyNews";
import NoContent from "@/features/common/NoContent";
import SignUpModalWrapper from "@/features/signup/components/SignUpModalWrapper";

const ITEMS_PER_PAGE = 9;

export default async function TodayNewsCardGrid({
  categoryLabel,
  className,
}: {
  categoryLabel: string | null;
  className?: string;
  }) {

  const newsList = await fetchNewsCardList({
    selectedCategory: categoryLabel ?? "전체",
  });

  return (
    <div className="mt-45">
      {newsList.length === 0 ? (
        <NoContent message="불러올 뉴스가 없어요." />
      ) : (
        <PaginatedNewsCardGrid
          newsList={newsList}
          itemsPerPage={ITEMS_PER_PAGE}
          categoryLabel={categoryLabel}
          type={DetailPageType.TODAY}
          className={className}
        />
      )}
      <SignUpModalWrapper />
    </div>
  );
}
