import Link from "next/link";
import Image from "next/image";
import RefreshOnBackWrapper from "@/components/RefreshOnBackWrapper";
import RecommendedNewsCardGridByCategory from "@/features/recommended-news/components/RecommendedNewsCardGrid";
import PressCompanyFilterWrapper from "@/features/common/PressCompanyFilterWrapper";
import { NewsPathParams } from "@/types/news/newsPathParams";
import { parseNewsPathParams } from "@/utils/news/parseNewsPathParams";

export default function RecommendedNewsByCategory({ params, searchParams }: NewsPathParams) {
  const { categoryLabel, selectedPressCompanyName } = parseNewsPathParams({
    params,
    searchParams,
  });
 
  return (
    <div className="space-y-45">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link prefetch={true} href={"/recommended-news"}>
            <div className="font-title-24">나의 추천 뉴스</div>
          </Link>
          <Image
            src={"/assets/right-arrow.png"}
            alt="분류"
            width={20}
            height={20}
          />
          <div className="font-title-24">{categoryLabel}</div>
        </div>
        <PressCompanyFilterWrapper />
      </div>
      <RefreshOnBackWrapper>
        <RecommendedNewsCardGridByCategory
          categoryLabel={categoryLabel}
          selectedPressCompanyName={selectedPressCompanyName}
        />
      </RefreshOnBackWrapper>
    </div>
  );
}
