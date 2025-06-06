import { Button } from "@/components/ui/button";
import Divider from "@/features/common/Divider";
import NewsContent from "@/features/detail/components/NewsContent";
import NewsPageHeader from "@/features/detail/components/NewsPageHeader";
import NewsTitle from "@/features/detail/components/NewsTitle";

type Props = {
  params: {
    id: number;
  };
};

export default async function NewsDetailPage({ params }: Props) {
  const param = await params;
  const newsId = decodeURIComponent(param.id.toString());

  return (
      <div className="flex space-x-20">
        <Button variant="ghost" className="aspect-square w-46">
          <img src={"/assets/back-arrow.png"} />
        </Button>
        <div className="w-full">
          <NewsPageHeader />
          <NewsTitle />
          <Divider />
          <NewsContent />
          <Divider />
        </div>
      </div>
  );
}
