"use client";

import { useState } from "react";
import LoginPopup from "./LoginPopup";

export default function LoginButton() {
  const [showPopup, setShowPopup] = useState(false);
  
  return (
    <div className="relative">
      <button
        className="font-basic-16 aspect-[80/20] w-[6vw] max-w-80 rounded-full border border-purple-500 p-10 text-purple-500"
        onClick={() => setShowPopup(!showPopup)}
      >
        로그인
      </button>
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
