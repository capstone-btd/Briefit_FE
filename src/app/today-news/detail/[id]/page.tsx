import { Button } from "@/components/ui/button";
import Divider from "@/features/common/Divider";
import ResponsiveImage from "@/features/common/ResponsiveImage";
import NewsContent from "@/features/detail/components/NewsContent";
import NewsPageHeader from "@/features/detail/components/NewsPageHeader";
import NewsSourceCardList from "@/features/detail/components/NewsSourceCardList";
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
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="뉴스 기사 이미지"
          className="mx-auto my-60 h-470 w-710"
        />
        <NewsContent />
        <Divider />
        <NewsSourceCardList/>
      </div>
    </div>
  );
}
