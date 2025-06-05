import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

function NewsCardCategoryTag({ label }: { label: string }) {
  return (
    <div className="font-basic-16 rounded-full bg-purple-100 px-12 py-4">
      {label}
    </div>
  );
}

export function NewsCard({ categoryLabel }: { categoryLabel: string }) {
  return (
    <Card className="group rounded-20 relative w-full p-20">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-50">
        <div className="rounded-12 h-full w-full bg-[linear-gradient(180deg,#FFFFFF00_20.67%,#00000080)]"></div>
      </div>
      <CardHeader>
        <div className="flex items-center gap-16">
          <NewsCardCategoryTag label={categoryLabel} />
          <div className="font-light-16 text-gray-400">
            한겨레, 중앙일보, 경향신문
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="font-title-24 mb-12">
          헌재, 평결 끝냈다... 4일 탄핵심판 선고
        </div>
        <div className="font-light-16 h-80 overflow-hidden text-justify">
          기사 내용 기사 내용 기사 내용 기사 내용 기사 내용 기사 내용 기사 내용
          기사 내용 기사 내용 기사 내용 기사 내용 기사 내용 기사 내용 기사 내용
          기사 내용 기사 내용 기사 내용 기사 내용 기사 내용 기사 내용 기사 내용
          기사 내용 기사 내용 기사 내용 기사 내용 기사 내용 기사 내용 기사 내용
          기사 내용 기사 내용 기사 내용 기사 내용 기사 내용 기사 내용 기사 내용
          기사 내용 기사 내용 기사 내용 기사 내용 기사 내용 기사 내용 기사 내용
        </div>
        <div className="mx-auto mt-30 flex h-180 w-300 items-center justify-center bg-gray-300">
          기사 이미지
        </div>
      </CardContent>
    </Card>
  );
}
