import { useAuthStore } from "@/stores/auth/useAuthStore";

export async function registerUser(name: string, categories: string[]) {
  const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
  const accessToken = useAuthStore.getState().accessToken;

  const response = await fetch(
    `${baseUrl}/users/registration?nickname=${encodeURIComponent(name)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(categories),
    }
  );

  if (!response.ok) {
    // 서버에서 에러 메시지 반환 시
    const error = await response.text();
    throw new Error(error || "회원가입 요청 실패");
  }
  return await response.json();
}
