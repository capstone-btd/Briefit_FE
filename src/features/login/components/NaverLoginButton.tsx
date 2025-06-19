import Link from "next/link";
import Image from "next/image";
export default function NaverLoginButton() {
    const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
    return (
      <Link prefetch={true} href={`${baseUrl}/oauth2/authorization/naver`}>
        <Image src={"/assets/naver-login-btn.png"} alt="로그인" width={305} height={58}/>
      </Link>
    );
}
