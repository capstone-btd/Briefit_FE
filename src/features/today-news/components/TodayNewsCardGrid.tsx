"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import SignUpModal from "@/features/signup/components/SignUpModal";
import { DetailPageType } from "@/constants/detailPageType";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import { NewsSummary } from "@/types/news/newsSummary";
import fetchNewsCardList from "../api/news";
import { dummyNews } from "@/mock/dummyNews";

const ITEMS_PER_PAGE = 9;

export default function TodayNewsCardGrid({
  categoryLabel,
  className,
}: {
  categoryLabel: string | null;
  className?: string;
  }) {
  


  // 회원가입 모달창 상태관리 변수
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isNew = useAuthStore((state) => state.isNew);
  const [open, setOpen] = useState(false);

  // 회원가입 모달창 띄우기
  useEffect(() => {
    if (isLoggedIn && isNew) {
      setOpen(true);
    }
  }, [isLoggedIn, isNew]);

  // const newsList = await fetchNewsCardList({
  //   selectedCategory: categoryLabel ?? "전체",
  // });

  return (
    <div>
      <div className="mt-45">
        <PaginatedNewsCardGrid
          newsList={dummyNews}
          itemsPerPage={ITEMS_PER_PAGE}
          categoryLabel={categoryLabel}
          type={DetailPageType.TODAY}
          className={className}
        />
      </div>
      {open && <SignUpModal open={open} onClose={() => setOpen(false)} />}
    </div>
  );
}
