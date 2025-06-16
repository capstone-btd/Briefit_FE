import { formatKoreanDateTime } from "@/utils/dateTimeStringFormatter";
import { fetchWordList } from "../api/news";
import WordCloudServer from "./WordCloudServer";

export default async function TodayIssue() {
  const wordCloudList = await fetchWordList();
  const createdAt = wordCloudList.createdAt;
  return (
    <div className="space-y-7">
      <div className="flex items-center space-x-50">
        <div className="font-title-24">오늘의 이슈</div>
        <div className="font-basic-16 text-gray-400">
         {formatKoreanDateTime({isoString: createdAt, needUnitText: true})} 기준
        </div>
      </div>
      <WordCloudServer
        wordCloudData={wordCloudList}
      />
    </div>
  );
}
