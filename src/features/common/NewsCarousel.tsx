"use client";

import { useState, useEffect, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DetailPageType } from "@/constants/detailPageType";
import Link from "next/link";
import ResponsiveImage from "./ResponsiveImage";
import { NewsSummary } from "@/types/news/newsSummary";
import { cn } from "@/lib/utils";
import { getPressCompanyNameString } from "@/utils/news/getPressCompanyNameString";
import Image from "next/image";
import { NewsCardCategoryTag } from "./NewsCard";

export const MobileNewsCard = memo(function MobileNewsCard({
  type,
  categoryLabel,
  newsSummary,
  themeColor,
  children,
}: {
  type: DetailPageType;
  categoryLabel: string | null;
  newsSummary: NewsSummary;
  themeColor?: string | null;
  children?: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const themeBgColor = themeColor ? `bg-${themeColor}` : "bg-white";
  const themeText1Color = themeColor ? `text-${themeColor}-text1` : "";
  const themeText2Color = themeColor
    ? `text-${themeColor}-text2`
    : "text-gray-400";
  const hasImage = newsSummary.imgUrls && newsSummary.imgUrls.length > 0;

  return (
    <Link
      prefetch={true}
      href={`${type}/detail?articleId=${newsSummary.articleId ?? "null"}&scrapId=${newsSummary.scrapId ?? "null"}&customId=${newsSummary.customId}`}
    >
      <Card
        className={cn(
          "relative flex flex-row gap-20 rounded-20 p-20",
          themeBgColor,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 왼쪽 이미지 영역 */}
        {hasImage && (
          <ResponsiveImage
            src={newsSummary.imgUrls[0]}
            alt="뉴스 기사 이미지"
            className="size-90 rounded-12"
            rounded="12"
          />
        )}

        {/* 오른쪽 콘텐츠 영역 */}
        <CardContent className="flex flex-grow flex-col px-0 py-4">
          {/* 카테고리 태그 */}
          <div className="mb-5 w-min">
            <NewsCardCategoryTag
              label={categoryLabel ?? newsSummary.categories[0]}
              isMobile={true}
            />
          </div>
          {/* 제목 */}
          <div
            className={cn("mb-6 line-clamp-2 font-title-16", themeText1Color)}
          >
            {newsSummary.title}
          </div>

          {/* 언론사 정보와 아이콘 */}
          <div className="flex items-center justify-between">
            <div
              className={cn(
                "overflow-hidden font-light-14 overflow-ellipsis whitespace-nowrap",
                themeText2Color,
              )}
            >
              {getPressCompanyNameString(newsSummary.pressCompanies)}
            </div>
            <div className="flex items-center gap-8">
              {newsSummary.customId && (
                <Image
                  src="/assets/custom-mark.png"
                  alt="커스텀"
                  width={14}
                  height={14}
                />
              )}
              {newsSummary.scrapId && (
                <Image
                  src="/assets/scrap-mark.png"
                  alt="스크랩"
                  width={11}
                  height={15}
                />
              )}
            </div>
          </div>
        </CardContent>
        {children && isHovered && (
          <div className="pointer-events-none absolute inset-0 right-20 bottom-15 z-10 flex items-end justify-end">
            <div className="pointer-events-auto">{children}</div>
          </div>
        )}
      </Card>
    </Link>
  );
});


export function NewsCarousel({
  type,
  categoryLabel,
  newsList,
  themeColor,
  children,
}: {
  type: DetailPageType;
  categoryLabel: string | null;
  newsList: NewsSummary[];
  themeColor?: string | null;
  children?: React.ReactNode;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const totalSlides = Math.ceil(newsList.length / 2);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // 2개씩 보여줌
  const groupedNews = [];
  for (let i = 0; i < newsList.length; i += 2) {
    groupedNews.push(newsList.slice(i, i + 2));
  }

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {groupedNews.map((group, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col gap-15">
                {group.map((newsSummary, subIndex) => (
                  <MobileNewsCard
                    key={subIndex}
                    type={type}
                    categoryLabel={categoryLabel}
                    newsSummary={newsSummary}
                    themeColor={themeColor}
                  >
                    {children}
                  </MobileNewsCard>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* 하단 인디케이터 */}
      <div className="mt-10 flex justify-center gap-6">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "size-6 rounded-full transition-colors",
              current === index ? "bg-gray-400" : "bg-gray-100",
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </>
  );
}
