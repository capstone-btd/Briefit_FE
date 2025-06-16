import ApiException from "@/exception/apiException";
import apiClient from "@/utils/apiClient";

export async function fetchScrapedNewsList({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const params = { category: selectedCategory };
  try {
    const response = await apiClient.get("/users/scraps", {
      params,
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

export async function fetchCustomNewsList({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const params = { category: selectedCategory };
  try {
      const response = await apiClient.get("/users/scrap/customize", {
      params,
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