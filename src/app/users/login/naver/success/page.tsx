import dynamic from "next/dynamic";
import { Suspense } from "react";

// Client Component를 CSR로 불러오기
const NaverLoginCallbackPage = dynamic(
  () => import("@/features/login/components/NaverLoginCallBack"),
);

export default function Page() {
  return (
    <Suspense fallback={<div>로그인 처리 중입니다...</div>}>
      <NaverLoginCallbackPage />
    </Suspense>
  );
}
