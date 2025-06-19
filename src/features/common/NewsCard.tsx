import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DetailPageType } from "@/constants/detailPageType";
import Link from "next/link";
import ResponsiveImage from "./ResponsiveImage";
import { NewsSummary } from "@/types/news/newsSummary";
import { cn } from "@/lib/utils";
import { getPressCompanyNameString } from "@/utils/news/getPressCompanyNameString";

function NewsCardCategoryTag({ label }: { label: string }) {
  return (
    <div className="rounded-full bg-purple-100 px-12 py-4 font-basic-16 whitespace-nowrap">
      {label}
    </div>
  );
}

export function NewsCard({
  type,
  categoryLabel,
  newsSummary,
  className,
  children,
}: {
  type: DetailPageType;
  categoryLabel: string | null;
  newsSummary: NewsSummary;
  className?: string;
  children?: React.ReactNode;
}) {
  // hover 상태 관리
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link prefetch={true} href={`${type}/detail?articleId=${newsSummary.articleId ?? "null"}&scrapId=${newsSummary.scrapId ?? "null"}&isCustomize=${newsSummary.isCustomize}`}>
      <Card
        className={cn(
          "relative h-full overflow-hidden rounded-20 p-20",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader>
          <div className="flex h-30 items-center gap-16">
            <NewsCardCategoryTag
              label={categoryLabel ?? newsSummary.categories[0]}
            />
            <div className="font-light-16 overflow-ellipsis whitespace-nowrap text-gray-400">
              {getPressCompanyNameString(newsSummary.pressCompanies)}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-12 h-48 overflow-hidden font-title-24">
            {newsSummary.title}
          </div>
          <div className="h-80 overflow-hidden text-justify font-light-16">
            {newsSummary.body}
          </div>
          <ResponsiveImage
            src={
              newsSummary.imgUrls[0] ??
              "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            }
            alt="뉴스 기사 이미지"
            ratio={300 / 226}
            className="mx-auto mt-25 w-[15vw] max-w-300"
          />
        </CardContent>

        {/* hover 시에만 children 렌더링 */}
        {children && isHovered && (
          <div className="pointer-events-none absolute inset-0 right-20 bottom-15 z-10 flex items-end justify-end">
            <div className="pointer-events-auto">{children}</div>
          </div>
        )}
      </Card>
    </Link>
  );
}
