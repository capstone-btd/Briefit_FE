// 유저의 로그인 상태 모델 (토큰 등 인증 정보만 저장)

export type AuthState = {
  isLoggedIn: boolean;
  isNew: boolean;
  accessToken: string | null; // 추후 수정 필요
  setAccessToken: (accessToken: string) => void; // 추후 수정 필요
  login: (accessToken: string, isNew: boolean) => void; // 추후 수정 필요
  logout: () => void;
};
