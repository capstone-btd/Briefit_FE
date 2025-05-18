import Link from "next/link";

export default function NaverLoginButton() {
  const clientId = process.env.NAVER_CLIENT_ID!;
  const redirectUri = "http://localhost:3000/login/naver";
  const state = "temp"; // 랜덤 값으로 수정 후 스토리지에 저장 필요

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${state}`;

  return (
    <Link href={NAVER_AUTH_URL}>
      <button className="px-4 py-2 bg-green-500 text-white rounded transition">네이버 로그인</button>
    </Link>
  );
}
