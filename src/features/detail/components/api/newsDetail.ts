import ApiException from "@/exception/apiException";
import api from "@/utils/axios";

export default async function fetchNewsDetail({
  id,
  containsAuthHeader,
}: {
  id: number;
  containsAuthHeader: boolean;
}) {
  const params = { "article-id": id };
  const headers = containsAuthHeader ? {} : { "x-auth-not-required": "true" }; // 오늘의 뉴스일 경우 헤더 불필요
  try {
    const response = await api.get("/article", {
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    } else {
      console.error(error);
    }
    return;
  }
}
