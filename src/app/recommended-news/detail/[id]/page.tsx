// 클라이언트 컴포넌트에 파라미터(id)를 전달하는 서버 컴포넌트
import RecommendedNewsDetail from "@/features/detail/components/RecommededNewsDetail";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function RecommendedNewsDetailPage(props: Props) {
  const params = use(props.params); 
  const id = Number(params.id);

  return <RecommendedNewsDetail id={id} />;
}