import React from "react";
import LogoButton from "../LogoButton";
import Navigationbar from "./Navigatonbar";
import { Search } from "lucide-react";
import { isLoggedInUser, useAuthStore } from "@/stores/auth/useAuthStore";
import UserProfileImage from "@/features/common/UserProfileImage";
import LoginButton from "@/features/login/components/LoginButton";
import { navItems } from "@/constants/navItems";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import { useNavigation } from "@/hooks/useNavigation";
import NewsCategoryBar from "@/features/common/categorybar/NewsCategorybar";
import Link from "next/link";
import { DetailPageType } from "@/constants/detailPageType";
import { newsCategories } from "@/constants/newsCategries";
import { useUserStore } from "@/stores/auth/useUserStore";

export default function MobileHeader() {
  const { selectedPath, setSelectedPath } = useNavStore();
  const { handleClick } = useNavigation(selectedPath, setSelectedPath);
  const isLoggedIn = useAuthStore(isLoggedInUser);
  const userCategories = useUserStore((state) => state.categories);
  const categories = isLoggedIn && selectedPath === DetailPageType.RECOMMENDED ? [newsCategories[0], ...userCategories] : newsCategories;

  return (
    <header className="mt-10">
      <div className="bg-white relative pb-15 flex w-full items-center px-20">
        <div className="absolute left-1/2 -translate-x-1/2">
          <LogoButton
            width={84}
            height={36}
            onClick={() => handleClick(0, navItems[0].path)}
          />
        </div>
        <div className="ml-auto flex gap-10">
          <Link href="/search/mobile" className="cursor-pointer">
            <Search scale={24} />
          </Link>
          {isLoggedIn ? (
            <UserProfileImage scale={24} />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
      <Navigationbar />
      <NewsCategoryBar basePath={selectedPath.substring(1)} categories={categories}/>
    </header>
  );
}
