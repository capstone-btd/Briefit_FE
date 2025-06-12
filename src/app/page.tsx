'use client';
import { useState } from "react";
import SignUpModal from "@/features/signup/components/SignUpModal";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <div>
      <h1>메인페이지</h1>
      <Button
        className="px-6 py-3 bg-violet-600 text-white rounded-lg font-semibold shadow"
        onClick={() => setSignupOpen(true)}
      >
        회원가입
      </Button>
      {signupOpen && (
        <SignUpModal open={signupOpen} onClose={() => setSignupOpen(false)} />
      )}  
    </div>
  );
}