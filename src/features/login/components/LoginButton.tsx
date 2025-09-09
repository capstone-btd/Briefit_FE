"use client";

import { useState } from "react";
import LoginPopup from "./LoginPopup";
import { useDeviceStore } from "@/stores/device/useDeviceStore";
import { UserRound } from "lucide-react";

export default function LoginButton() {
  const [showPopup, setShowPopup] = useState(false);
  const isMobile = useDeviceStore((s) => s.isMobile);

  return (
    <div className="relative">
      {isMobile ? (
        <UserRound
          scale={24}
          onClick={() => setShowPopup(!showPopup)}
        />
      ) : (
        <button
          className="aspect-[80/20] w-[6vw] max-w-80 rounded-full border border-purple-500 p-10 font-basic-16 text-purple-500"
          onClick={() => setShowPopup(!showPopup)}
        >
          로그인
        </button>
      )}
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
