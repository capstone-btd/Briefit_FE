import ApiException from "@/exception/apiException";
import apiServer from "@/utils/apiServer";

export default async function fetchNewsCardList({
  selectedCategory
}: {
  selectedCategory: string;
}) {
  const params = { category: selectedCategory };
  try {
    const response = await apiServer.get("/articles", {
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

export async function fetchWordList() {
  try {
    const response = await apiServer.get("/wordcloud", {
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
