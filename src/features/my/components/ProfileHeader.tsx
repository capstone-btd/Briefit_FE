"use client";

import ResponsiveImage from "@/features/common/ResponsiveImage";
import { isLoggedInUser, useAuthStore } from "@/stores/auth/useAuthStore";

export default function ProfileHeader() {
    const isUser = useAuthStore(isLoggedInUser);
    const nickname = "닉네임";
    const imageUrl =
      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80";
  return (
    <div className="flex items-center gap-12">
      <ResponsiveImage
        src={imageUrl}
        alt="프로필 이미지"
        className="h-80 w-80"
        rounded="full"
      />
      <div className="font-title-24">{isUser ? nickname : "로그인 후 이용해주세요."} </div>
    </div>
  );
}
