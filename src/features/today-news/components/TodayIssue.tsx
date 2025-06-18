import { formatKoreanDateTime } from "@/utils/dateTimeStringFormatter";
import { fetchWordList } from "../api/news";
import WordCloudServer from "./WordCloudServer";
import NoContent from "@/features/common/NoContent";

export default async function TodayIssue() {
  const wordCloudData = await fetchWordList();

  if (!wordCloudData) {
    return (
      <div className="space-y-7">
        <div className="flex items-center space-x-50">
          <div className="font-title-24">오늘의 이슈</div>
        </div>
        <NoContent message="불러올 데이터가 없어요." />
      </div>
    );
  }

  const { createdAt } = wordCloudData;

  return (
    <div className="space-y-7">
      <div className="flex items-center space-x-50">
        <div className="font-title-24">오늘의 이슈</div>
        <div className="font-basic-16 text-gray-400">
          {formatKoreanDateTime({
            isoString: createdAt,
            needUnitText: true,
          })}{" "}
          기준
        </div>
      </div>
      <WordCloudServer wordCloudData={wordCloudData} />
    </div>
  );
}
