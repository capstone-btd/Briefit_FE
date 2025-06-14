"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Divider from "@/features/common/Divider";
import ResponsiveImage from "@/features/common/ResponsiveImage";
import fetchNewsDetail from "@/features/detail/components/api/newsDetail";
import NewsContent from "@/features/detail/components/NewsContent";
import NewsPageHeader from "@/features/detail/components/NewsPageHeader";
import NewsSourceCardList from "@/features/detail/components/NewsSourceCardList";
import NewsTitle from "@/features/detail/components/NewsTitle";
import { NewsData, NewsSource } from "@/types/news/newsData";
import NewsCustomBar from "./NewsCustomBar";
import { useNewsCustomStore } from "@/stores/detail/useNewsCustomStore";

type Props = {
  id: number;
  containsAuthHeader: boolean; // 데이터 페칭 시 인증 토큰 필요 여부
};

export default function NewsDetail({ id, containsAuthHeader }: Props) {
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const { activeThemeColor, activeHighlightColor, highlights } = useNewsCustomStore();

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await fetchNewsDetail({ id, containsAuthHeader: containsAuthHeader });
      setNewsData(data);
    };
    fetchDetail();
  }, [id]);

  const pressCompanyNameList =
    newsData?.sources.map((source: NewsSource) => source.pressCompany) ?? [];

  return (
    <div className={`flex space-x-20 ${activeThemeColor}`}>
      <NewsCustomBar />
      <ArrowLeft strokeWidth={1.5} size={30} color="#888888" onClick={() => router.back()} className="mr-15 aspect-square cursor-pointer hover:bg-transparent"/>
      <div className="w-full">
        <NewsPageHeader />
        {newsData ? (
          <>
            <NewsTitle
              categoryLabel={newsData.categories[0]}
              pressCompanies={pressCompanyNameList}
              title={newsData.title}
              createdAt={newsData.createdAt}
            />
            <Divider />
            <ResponsiveImage
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="뉴스 기사 이미지"
              className="mx-auto my-60 h-470 w-710"
            />
            <NewsContent body={newsData.body} highlights={highlights} />
            <Divider />
            <NewsSourceCardList newsSourceList={newsData.sources} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
