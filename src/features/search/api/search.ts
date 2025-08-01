import ApiException from "@/exception/apiException";
import apiServer from "@/utils/api/apiServer";

export default async function fetchNewsCardListByKeyword({
  keyword,
}: {
  keyword: string;
}) {
  const params = { string: keyword };
  try {
    const response = await apiServer.get("/articles/search", {
      params,
      headers: {
        "x-auth-not-required": "true", // 인증 헤더 제외
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    }
    throw error;
  }
}
