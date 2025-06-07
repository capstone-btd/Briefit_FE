import WordCloudServer from "./WordCloudServer";

export default function TodayIssue() {
  return (
    <div className="space-y-7">
      <div className="flex items-center space-x-50">
        <div className="font-title-24">오늘의 이슈</div>
        <div className="font-basic-16 text-gray-400">
          2025.03.30.오전 3시 30분 기준
        </div>
      </div>
      <WordCloudServer
        wordList={[
          "AI",
          "뉴스",
          "기술",
          "세계",
          "경제",
          "한국",
          "데이터",
          "정책",
          "환경",
          "AI",
          "뉴스",
          "기술",
          "세계",
          "경제",
          "한국",
          "데이터",
          "정책",
          "환경",
          
        ]}
      />
    </div>
  );
}
