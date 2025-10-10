import { newsCategories } from "@/constants/newsCategries";
import { NewsPathParams } from "@/types/news/newsPathParams";

export function parseNewsPathParams({ params, searchParams }: NewsPathParams) {
  // 카테고리 이름 → 라벨 변환
  const categoryLabel = params.category
    ? (newsCategories.find((e) => e.name === params.category[0])?.label ?? null)
    : null;

  // 검색 파라미터에서 언론사 이름 추출
  const selectedPressCompanyName = searchParams?.company ?? "전체";

  return {
    categoryLabel,
    selectedPressCompanyName,
  };
}
