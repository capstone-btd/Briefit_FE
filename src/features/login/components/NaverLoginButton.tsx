import Link from "next/link";

export default function NaverLoginButton() {
    const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
    return (
      <Link prefetch={true} href={`${baseUrl}/oauth2/authorization/naver`}>
        <img src={"/assets/naver-login-btn.png"}></img>
      </Link>
    );
}
