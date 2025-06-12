"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export default function NaverLoginCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const login = useAuthStore((state: { login: any; }) => state.login);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const isNewUser = searchParams.get("registration") === "no";

    if (!accessToken) {
      console.log("ERROR: 토큰 없음");
      return;
    }

    login(accessToken, isNewUser);
    
    router.replace("/"); 
  }, [searchParams, router, login]);

  return <div></div>;
}
