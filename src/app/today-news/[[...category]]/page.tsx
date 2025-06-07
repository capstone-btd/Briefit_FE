import { newsCategories } from "@/constants/newsCategries";
import TodayAINews from "@/features/today-news/components/TodayAINews";
import TodayIssue from "@/features/today-news/components/TodayIssue";

type Props = {
  params: {
    category?: string;
  };
};

export default async function TodayNewsPage({ params }: Props) {
  const param = await params;
  const category = decodeURIComponent(param.category || "전체");
  const categoryLabel =
    newsCategories.find((e) => e.name == category)?.label ?? "전체";
  return (
    <div>
      <TodayAINews categoryLabel={categoryLabel} />
      <div className="mt-70">
        <TodayIssue />
      </div>
    </div>
  );
}
