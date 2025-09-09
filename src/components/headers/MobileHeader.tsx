import React from "react";
import LogoButton from "../LogoButton";
import Navigationbar from "../Navigatonbar";
import { Search } from "lucide-react";
import { isLoggedInUser, useAuthStore } from "@/stores/auth/useAuthStore";
import UserProfileImage from "@/features/common/UserProfileImage";
import LoginButton from "@/features/login/components/LoginButton";

export default function MobileHeader() {
  return (
    <header className="bg-theme-background text-theme-primary mt-10">
      <div className="relative mb-15 flex w-full items-center px-20">
        <div className="absolute left-1/2 -translate-x-1/2">
          <LogoButton width={84} height={36} />
        </div>
        <div className="flex gap-10 ml-auto">
          {useAuthStore(isLoggedInUser) ? (
            <UserProfileImage />
          ) : (
            <LoginButton />
          )}
          <Search scale={24} />
        </div>
      </div>
      <Navigationbar />
    </header>
  );
}
