"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Divider from "@/features/common/Divider";
import ResponsiveImage from "@/features/common/ResponsiveImage";
import fetchNewsDetail, { fetchScrapedNewsDetail } from "@/features/detail/api/newsDetail";
import NewsContent from "@/features/detail/components/NewsContent";
import NewsPageHeader from "@/features/detail/components/NewsPageHeader";
import NewsSourceCardList from "@/features/detail/components/NewsSourceCardList";
import NewsTitle from "@/features/detail/components/NewsTitle";
import { NewsData, NewsSource } from "@/types/news/newsData";
import NewsCustomBar from "./NewsCustomBar";
import { usePageSpecificNewsCustom } from "@/stores/detail/useNewsCustomStore";
import { pressCompanyNameMap } from "@/constants/pressCompanyNameMap";

type NewsDetailProps = {
  articleId: number | null; // 마이페이지 -> 커스텀/스크랩 뉴스 목록 조회에서 넘어올 경우 null
  scrapId: number | null;
  isCustomize: boolean;
  containsAuthHeader: boolean; // 데이터 페칭 시 인증 토큰 필요 여부
};

export default function NewsDetail({ articleId, scrapId, isCustomize, containsAuthHeader }: NewsDetailProps) {
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const id = scrapId ?? articleId ?? -1;
  console.log(articleId, scrapId, isCustomize)

  const {
    activeThemeColor,
    themeTextColor1,
    themeTextColor2,
    themeDividerColor,
    themeBorderColor,
    themeCardColor,
    activeIcon,
  } = usePageSpecificNewsCustom(id);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = scrapId && scrapId === id ? await fetchScrapedNewsDetail({id: id}) : await fetchNewsDetail({
        id: id,
        containsAuthHeader: containsAuthHeader,
      });
      setNewsData(data);
    };
    fetchDetail();
  }, [id, containsAuthHeader]);

  const pressCompanyNameList =
    newsData?.sources.map((source: NewsSource) => source.pressCompany) ?? [];

  return (
    <div className={`min-h-screen ${activeThemeColor ?? "bg-white"}`}>
      <div className="flex space-x-20 px-70">
        <NewsCustomBar pageId={id} />
        <ArrowLeft
          strokeWidth={1.5}
          size={30}
          color="#888888"
          onClick={() => router.back()}
          className="mr-15 aspect-square cursor-pointer hover:bg-transparent"
        />
        <div className="w-full">
          <NewsPageHeader pageId={id} />
          {newsData ? (
            <div className="px-70">
              <NewsTitle
                categoryLabel={newsData.categories[0]}
                pressCompanies={pressCompanyNameList}
                title={newsData.title}
                createdAt={newsData.createdAt}
                themeTextColor1={themeTextColor1}
                themeTextColor2={themeTextColor2}
              />
              <Divider className={themeDividerColor ?? ""} />
              <ResponsiveImage
              src={
                newsData.imgUrls[0] ??
                "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              }
              alt="뉴스 기사 이미지"
              className="mx-auto my-60 h-470 w-710"
            />
              <NewsContent
                body={newsData.body}
                themeTextColor1={themeTextColor1}
                activeIcon={activeIcon}
                pageId={id}
                // themeTextColor2={themeTextColor2}
              />
              <Divider className={themeDividerColor ?? ""} />
              <NewsSourceCardList
                 newsSourceList={newsData.sources.map((source) => ({
                ...source,
                pressCompany:
                  pressCompanyNameMap[source.pressCompany] ||
                  source.pressCompany,
              }))}
                themeCardColor={themeCardColor}
                themeTextColor1={themeTextColor1}
                themeBorderColor={themeBorderColor}
              />
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

