import ApiException from "@/exception/apiException";
import apiServer from "@/utils/apiServer";

export default async function fetchRecommendedNewsCardList({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const params = { category: encodeURIComponent(selectedCategory) };
  try {
    const response = await apiServer.get("/articles/recommend", {
      params
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