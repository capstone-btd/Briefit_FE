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
    <Card className="card-hover-effect h-150 w-280 cursor-pointer rounded-10 border p-20 transition-colors duration-200">
      <div className="space-y-15 font-title-20">{company}</div>
      <div className="font-basic-20">{title}</div>
    </Card>
  );
}

export default function NewsSourceCardList({
  newsSourceList,
}: {
  newsSourceList: NewsSource[];
}) {
  return (
    <div className="space-y-30">
      <div className="text-theme-primary font-title-24">
        이런 기사들을 모았어요
      </div>
      <div className="flex flex-col gap-10">
        {newsSourceList.map((newsSource, index) => (
          <a key={index} href={newsSource.url} target="_blank">
            <NewsSourceCard
              company={newsSource.pressCompany}
              title={newsSource.sourceTitle}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
