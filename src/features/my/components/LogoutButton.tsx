"use client";

import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useNavStore } from "@/stores/navigation/useNavStrore";

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
      className={`flex h-55 w-194 items-center rounded-10 px-10 py-5 hover:shadow-[0_0_3px_#B0B0B0] ${
        isActive ? "bg-purple-50" : "bg-white"
      }`}
      onClick={handleLogout}
    >
      <img src="/assets/logout.png" className="mr-12 h-45 w-45" />
      <div
        className={`font-title-16 ${
          isActive ? "text-purple-500" : "text-gray-400"
        }`}
      >
        로그아웃
      </div>
    </div>
  );
}
