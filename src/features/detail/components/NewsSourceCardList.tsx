import { Card } from "@/components/ui/card";
import { NewsSource } from "@/types/news/newsData";

function NewsSourceCard({
  company,
  title,
}: {
  company: string;
  title: string;
}) {
  return (
    <Card className="card-hover-effect rounded-10 h-150 w-280 cursor-pointer border p-20 transition-colors duration-200">
      <div className="font-title-20 space-y-15">{company}</div>
      <div className="font-basic-20">{title}</div>
    </Card>
  );
}


export default function NewsSourceCardList({ newsSourceList }: { newsSourceList: NewsSource[]; }) {
  // 클릭 시 url 로 이동하도록 수정
  return (
    <div className="mt-55">
      <div className="font-title-24">이런 기사들을 모았어요</div>
      <div className="mt-15 flex gap-20">
        {newsSourceList.map((item, index) => (
          <NewsSourceCard
            key={index}
            company={item.pressCompany}
            title={item.sourceTitle}
          />
        ))}
      </div>
    </div>
  );
}
