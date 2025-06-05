import { newsCategories } from "@/constants/newsCategries";
import TodayAINews from "@/features/today-news/components/TodayAINews";

interface Props {
  params: {
      category?: string;
  };
}

export default function TodayNewsPage({ params }: Props) {
    const category = params.category;
    const categoryLabel = newsCategories.find((e) => e.name == category)?.label ?? '전체';
  return (
    <div>
      <TodayAINews categoryLabel={categoryLabel}/>
    </div>
  );
}
