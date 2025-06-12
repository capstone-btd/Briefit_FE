import ApiException from "@/exception/apiException";
import apiClient from "@/utils/apiClient";

export default async function registerUser(name: string, categories: string[]) {
  try {
    const response = await apiClient.post(
      `/users/registration?nickname=${encodeURIComponent(name)}`,
      categories,
    );
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
