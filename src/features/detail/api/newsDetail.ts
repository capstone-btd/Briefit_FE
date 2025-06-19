import ApiException from "@/exception/apiException";
import apiClient from "@/utils/apiClient";

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
    const response = await apiClient.get("/article", {
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
    alert("뉴스 정보 조회에 실패했습니다.");
    return;
  }
}

export async function fetchScrapedNewsDetail({ id }: { id: number }) {
  const params = { "scrap-id": id };
  try {
    const response = await apiClient.get("/users/scrap", {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
    alert("뉴스 정보 조회에 실패했습니다.");
    return;
  }
}
