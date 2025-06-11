"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import SignUpModal from "@/features/signup/components/SignUpModal";
import { DetailPageType } from "@/constants/detailPageType";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import { NewsSummary } from "@/types/news/newsSummary";

const ITEMS_PER_PAGE = 9;

export default function TodayNewsCardGrid({
  categoryLabel,
  newsSummaryList,
  className,
}: {
  categoryLabel: string | null;
  newsSummaryList: NewsSummary[];
  className?: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // 회원가입 모달창 상태관리 변수
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isNew = useAuthStore((state) => state.isNew);
  const [open, setOpen] = useState(false);

  const dummyNews: NewsSummary[] = Array.from({ length: 50 }, (_, i) => ({
    articleId: i + 1,
    categories: ["정치", "경제"],
    title: `AI 기술로 변화하는 글로벌 뉴스 산업 (${i + 1})`,
    body: "최근 인공지능 기술의 발전으로 뉴스 제작과 편집 과정이 자동화되고 있습니다. 특히 요약, 번역, 추천 시스템에서 두각을 나타내고 있습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    pressCompanies: ["한국일보", "중앙일보", "국민일보"],
  }));


  // 회원가입 모달창 띄우기
  useEffect(() => {
    if (isLoggedIn && isNew) {
      setOpen(true);
    }
  }, [isLoggedIn, isNew]);

  return (
    <div>
      <div className="mt-45">
        <PaginatedNewsCardGrid
          newsList={newsSummaryList}
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
