"use client";

import Navigationbar from "./Navigatonbar";
import Searchbar from "./Searchbar";
import LoginButton from "../features/login/components/LoginButton";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import UserProfileImage from "@/features/common/UserProfileImage";

export default function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isNew = useAuthStore((state) => state.isNew);

  return (
    <header className="relative mx-16 mt-28 flex justify-between xl:mx-100 2xl:mx-150">
      <Navigationbar />
      <div className="relative mt-[-18px] flex items-center gap-4 xl:gap-25 2xl:gap-35">
        <Searchbar />
        {isLoggedIn && !isNew ? <UserProfileImage /> : <LoginButton />}
      </div>
    </header>
  );
}
