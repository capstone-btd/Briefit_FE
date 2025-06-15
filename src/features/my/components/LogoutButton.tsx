"use client";

import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import { LogInIcon } from "lucide-react"; // 예시 아이콘 라이브러리

export default function LogoutButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
    const logout = useAuthStore((state) => state.logout);
    const setSelectedPath = useNavStore((state) => state.setSelectedPath);

  const handleLogout = () => {
    logout(); // localStorage 값 날림
      onClick();
      setSelectedPath("/today-news")
  };

  return (
    <div
      className={`mx-auto flex h-45 w-127 items-center rounded-10 px-10 py-5 hover:shadow-[0_0_3px_#D9D9D9] ${
        isActive ? "bg-purple-50" : "bg-white"
      }`}
      onClick={handleLogout}
    >
      <LogInIcon className="mr-12 text-gray-400" />
      <div
        className={`font-basic-20 ${
          isActive ? "text-purple-500" : "text-gray-400"
        }`}
      >
        로그아웃
      </div>
    </div>
  );
}
