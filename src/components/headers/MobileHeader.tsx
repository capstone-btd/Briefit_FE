import React from "react";
import LogoButton from "../LogoButton";
import Navigationbar from "../Navigatonbar";
import { Search } from "lucide-react";

export default function MobileHeader() {
  return (
    <header className="bg-theme-background text-theme-primary mt-10">
      <div className="relative mb-15 flex w-full items-center px-20">
        <div className="absolute left-1/2 -translate-x-1/2">
          <LogoButton width={84} height={36} />
        </div>
        <div className="ml-auto">
          <Search scale={24} />
        </div>
      </div>
        <Navigationbar />
    </header>
  );
}
