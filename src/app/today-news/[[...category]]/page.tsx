import { newsCategories } from "@/constants/newsCategries";
import TodayAINews from "@/features/today-news/components/TodayAINews";
import TodayIssue from "@/features/today-news/components/TodayIssue";
import { use } from "react";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default function TodayNewsPage(props: Props) {
  const { category } = use(props.params);
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
