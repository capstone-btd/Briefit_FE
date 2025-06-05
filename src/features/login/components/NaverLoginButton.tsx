import Link from "next/link";

export default function NaverLoginButton() {
    const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
    return (
      <Link href={`${baseUrl}/oauth2/authorization/naver`}>
        <img className="h-59 w-220" src={"/assets/naver-login-btn.png"}></img>
      </Link>
    );
}
