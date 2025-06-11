import ApiException from "@/exception/apiException";
import api from "@/utils/axios";

export default async function fetchNewsCardList({
  selectedCategory
}: {
  selectedCategory: string;
}) {
  const params = { category: encodeURIComponent(selectedCategory) };
  try {
    const response = await api.get("/articles", {
      params,
      headers: {
        "x-auth-not-required": "true", // 인증 헤더 제외
      },
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
