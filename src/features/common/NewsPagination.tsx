"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { useState } from "react";

type NewsPaginationProps = {
  totalCount: number; // 전체 뉴스 개수
  onPageChange: (page: number) => void;
};

export default function NewsPagination({
  totalCount,
  onPageChange,
}: NewsPaginationProps) {
  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(1);

  // 보여줄 페이지 범위 계산 (예: 현재 4페이지면 2~6 등)
  const getPageNumbers = () => {
    const range = 5; // 현재 페이지 기준 앞뒤로 2개씩
    let start = Math.max(currentPage - range, 1);
    let end = Math.min(currentPage + range, totalPages);

    // 항상 5개를 유지하고 싶을 때 (선택)
    const visibleCount = 5;
    if (end - start + 1 < visibleCount) {
      if (start === 1) {
        end = Math.min(start + visibleCount - 1, totalPages);
      } else if (end === totalPages) {
        start = Math.max(end - visibleCount + 1, 1);
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem className="w-28">
                      <PaginationPrevious
                          
              href="#" // 페이지 상단으로 이동
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
        )}

        {/* 페이지 숫자들 */}
        {getPageNumbers().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={currentPage === page}
              onClick={() => handlePageChange(page)}
              className={`font-basic-20 ${
                currentPage === page
                  ? "text-purple-500"
                  : "text-gray-400"
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 다음 페이지 화살표 */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
