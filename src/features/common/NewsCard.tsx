import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DetailPageType } from "@/constants/detailPageType";
import Link from "next/link";
import ResponsiveImage from "./ResponsiveImage";
import { NewsSummary } from "@/types/news/newsSummary";

function NewsCardCategoryTag({ label }: { label: string }) {
  return (
    <div className="font-basic-16 rounded-full bg-purple-100 px-12 py-4">
      {label}
    </div>
  );
}

export function NewsCard({
  type,
  categoryLabel,
  newsSummary,
}: {
  type: DetailPageType;
  categoryLabel: string;
  newsSummary: NewsSummary;
}) {
  return (
    <Link href={`${type}/detail/${newsSummary.articleId}`}>
      <Card className="group rounded-20 relative h-full w-full p-20">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-50">
          <div className="rounded-12 h-full w-full bg-[linear-gradient(180deg,#FFFFFF00_20.67%,#00000080)]"></div>
        </div>
        <CardHeader>
          <div className="flex items-center gap-16">
            <NewsCardCategoryTag label={categoryLabel} />
            <div className="font-light-16 text-gray-400">
              {newsSummary.pressCompanies.join(", ")} 
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="font-title-24 mb-12">{newsSummary.title}</div>
          <div className="font-light-16 h-80 overflow-hidden text-justify">
            {newsSummary.body}
          </div>
          <ResponsiveImage
            src={newsSummary.imageUrl}
            alt="뉴스 기사 이미지"
            className="mx-auto mt-30 h-180 w-300"
          />
        </CardContent>
      </Card>
    </Link>
  );
}
