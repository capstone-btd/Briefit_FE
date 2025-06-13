// 클라이언트 컴포넌트에 파라미터(id)를 전달하는 서버 컴포넌트
import NewsDetail from "@/features/detail/components/NewsDetail";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function TodayNewsDetailPage(props: Props) {
  const params = use(props.params); 
  const id = Number(params.id);

  return <NewsDetail id={id} containsAuthHeader={false} />;
}
