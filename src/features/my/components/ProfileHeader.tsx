"use client";

import ResponsiveImage from "@/features/common/ResponsiveImage";
import { isLoggedInUser, useAuthStore } from "@/stores/auth/useAuthStore";
import { useUserStore } from "@/stores/auth/useUserStore";

export default function ProfileHeader() {
  const isUser = useAuthStore(isLoggedInUser);
  const nickname = useUserStore((state) => state.nickname);
  const imageUrl = useUserStore((state) => state.profileUrl);

  return (
    <div className="flex items-center gap-12">
      {!imageUrl ? <div className="h-80 w-80 rounded-full bg-gray-100" /> :
        <ResponsiveImage
          src={imageUrl}
          alt="프로필 이미지"
          className="h-80 w-80"
          rounded="full"
        />}
      <div className="font-title-24">{isUser ? nickname : "로그인 후 이용해주세요."} </div>
    </div>
  );
}
