"use client";

import Navigationbar from "../../Navigatonbar";
import Searchbar from "./Searchbar";
import LoginButton from "../../../features/login/components/LoginButton";
import { useAuthStore, isLoggedInUser } from "@/stores/auth/useAuthStore";
import UserProfileImage from "@/features/common/UserProfileImage";
import LogoButton from "@/components/LogoButton";

export default function Header() {
  return (
    <header className="bg-theme-background text-theme-primary relative mx-16 flex justify-between pt-28 xl:mx-100 2xl:mx-150">
      {/* 임시 */}
      <div className="flex gap-110 items-baseline"> 
        <LogoButton width={84} height={36} />
        <Navigationbar />
      </div>
      <div className="relative mt-[-18px] flex items-center gap-4 xl:gap-25 2xl:gap-35">
        <Searchbar id="header" className="aspect-6/1 w-250" />
        {useAuthStore(isLoggedInUser) ? <UserProfileImage /> : <LoginButton />}
      </div>
    </header>
  );
}
