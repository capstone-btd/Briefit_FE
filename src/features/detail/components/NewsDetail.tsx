"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Divider from "@/features/common/Divider";
import ResponsiveImage from "@/features/common/ResponsiveImage";
import fetchNewsDetail, {
  fetchScrapedNewsDetail,
} from "@/features/detail/api/newsDetail";
import NewsContent from "@/features/detail/components/NewsContent";
import NewsPageHeader from "@/features/detail/components/NewsPageHeader";
import NewsSourceCardList from "@/features/detail/components/NewsSourceCardList";
import NewsTitle from "@/features/detail/components/NewsTitle";
import { NewsData, NewsSource } from "@/types/news/newsData";
import NewsCustomBar from "./NewsCustomBar";
import { pressCompanyNameMap } from "@/constants/pressCompanyNameMap";
import { useCustomBar } from "@/hooks/useCustomBar";
import { useNewsCustomStore } from "@/stores/detail/useNewsCustomStore";

type NewsDetailProps = {
  articleId: number | null; // 마이페이지 -> 커스텀/스크랩 뉴스 목록 조회에서 넘어올 경우 null
  scrapId: number | null;
  isCustomize: boolean;
  containsAuthHeader: boolean; // 데이터 페칭 시 인증 토큰 필요 여부
};

export default function NewsDetail({
  articleId,
  scrapId,
  isCustomize,
  containsAuthHeader,
}: NewsDetailProps) {
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsData | null>(null);

  const setGlobalBgColor = useNewsCustomStore(
    (state) => state.setGlobalBgColor,
  );
  const setGlobalDividerColor = useNewsCustomStore(
    (state) => state.setGlobalDividerColor,
  );
  const id = scrapId ?? articleId ?? -1;
  console.log(articleId, scrapId, isCustomize);

  const isScrapped = scrapId ? true : false;
  const customBar = useCustomBar();

  useEffect(() => {
    let isMounted = true;

    const fetchDetail = async () => {
      const data =
        scrapId && scrapId === id
          ? await fetchScrapedNewsDetail({ id: id })
          : await fetchNewsDetail({
              id: id,
              containsAuthHeader: containsAuthHeader,
            });
      if (isMounted) {
        setNewsData(data);
      }

      // 배경색 적용
      if (data.backgroundColor) {
        const themeColor = data.backgroundColor;
        setGlobalBgColor(`bg-${themeColor}`); // 전체 레이아웃에 적용
        setGlobalDividerColor(`bg-${themeColor}-dark`);
        console.log(`bg-${themeColor}-dark`);

        customBar.setActiveThemeColor(themeColor);
        customBar.setThemeBgColor(`bg-${themeColor}`);
        customBar.setThemeTextColor1(`text-${themeColor}-text1`);
        customBar.setThemeTextColor2(`text-${themeColor}-text2`);
        customBar.setThemeBorderColor(`border-${themeColor}-dark`);
        customBar.setThemeDividerColor(`bg-${themeColor}-dark`);
        customBar.setThemeCardColor(`bg-${themeColor}-light`);
      }

      // 하이라이트 적용
      if (Array.isArray(data.customs)) {
        // highlights setter를 직접 추가하거나, setHighlights를 커스텀바에서 export
        customBar.setHighlights(data.customs);
      }
    };
    fetchDetail();
    return () => {
      // 컴포넌트 언마운트 시 배경, divider 색 초기화
      setGlobalBgColor(null);
      setGlobalDividerColor(null);
      isMounted = false;
    };
  }, [id, scrapId, containsAuthHeader]);

  const pressCompanyNameList =
    newsData?.sources.map((source: NewsSource) => source.pressCompany) ?? [];

  // customBar에서 반환하는 값 구조 분해
  const {
    themeBgColor,
    themeTextColor1,
    themeTextColor2,
    themeDividerColor,
    themeBorderColor,
    themeCardColor,
    activeIcon,
    activeHighlightColor,
    highlights,
    addHighlight,
    removeHighlight,
  } = customBar;

  return (
    <div className={`min-h-screen pt-30 ${themeBgColor ?? "bg-white"}`}>
      <div className="flex space-x-20 px-70">
        <NewsCustomBar customBar={customBar} />
        <ArrowLeft
          strokeWidth={1.5}
          size={30}
          color="#888888"
          onClick={() => router.back()}
          className="mr-15 aspect-square cursor-pointer hover:bg-transparent"
        />
        <div className="w-full">
          <NewsPageHeader
            articleId={id}
            customBar={customBar}
            isScrapped={isScrapped}
          />
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
                highlights={highlights}
                addHighlight={addHighlight}
                removeHighlight={removeHighlight}
                activeHighlightColor={activeHighlightColor}
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
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
