import { User } from "../../types/auth/user";

// 유저 상태 모델

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null; // 추후 수정 필요
  setUser: (user: User) => void;
  setToken: (token: string) => void; // 추후 수정 필요
  login: (user: User, token: string) => void; // 추후 수정 필요
  logout: () => void;
};
