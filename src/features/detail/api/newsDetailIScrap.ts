import ApiException from "@/exception/apiException";
import apiClient from "@/utils/apiClient";

export default async function postScrap({
  id,
}: {
  id: number;
}) {
  try {
    const response = await apiClient.post(`/users/scrap?article-id=${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
    alert("뉴스 스크랩에 실패했습니다.");
    console.log(error);
    return;
  }
}
