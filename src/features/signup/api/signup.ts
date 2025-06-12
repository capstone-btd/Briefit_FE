import { ApiException } from "@/exception/apiException";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import api from "@/utils/axios";

export default async function registerUser(name: string, categories: string[]) {
  try {
    const response = await api.post(
      `/users/registration?nickname=${encodeURIComponent(name)}`,
      categories
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
