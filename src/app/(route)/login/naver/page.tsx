"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// 테스트용 로그인 완료 페이지

export default function NaverCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = "temp"; // 실제로는 저장해두었다가, 일치 여부 검사 필요

  useEffect(() => {
    if (!code || !state) {
      console.error("code 또는 state가 존재하지 않음");
      return;
    }

    if (state !== storedState) {
      console.error("상태 토큰 불일치");
      return;
    }

    console.log("NAVER AUTH:", code);
    console.log("STATE:", state);

    // 백엔드로 인가 코드 전송 api 호출
  }, [code, state]);

  return <div>로그인 완료</div>;
}
