import { Card } from "@/components/ui/card";

function NewsSourceCard({
  company,
  title,
}: {
  company: string;
  title: string;
}) {
  return (
    <Card className="rounded-10 h-150 w-280 cursor-pointer border p-20 transition-colors duration-200 hover:border-purple-300">
      <div className="font-title-20 space-y-15">{company}</div>
      <div className="font-basic-20">{title}</div>
    </Card>
  );
}

// 뉴스 소스 카드 리스트 컴포넌트
const newsSourceList = [
  { company: "한국경제", title: "삼성전자, 2분기 실적 발표" },
  { company: "중앙일보", title: "정부, 부동산 정책 발표" },
];

export default function NewsSourceCardList() {
    return (
        <div className="mt-55">
            <div className="font-title-24">이런 기사들을 모았어요</div>
        <div className="flex gap-20 mt-15">
          {newsSourceList.map((item, index) => (
            <NewsSourceCard
              key={index}
              company={item.company}
              title={item.title}
            />
          ))}
        </div>
      </div>
    );
}
