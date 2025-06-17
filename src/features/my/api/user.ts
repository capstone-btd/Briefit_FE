import ApiException from "@/exception/apiException";
import apiClient from "@/utils/apiClient";

export async function fetchUserInfo() {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
     // 예외 처리 코드
    } else {
      alert("회원 정보 조회에 실패했습니다.");
    }
    return;
  }
}
