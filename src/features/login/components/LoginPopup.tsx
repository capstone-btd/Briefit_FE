// components/LoginPopup.tsx
import { useRef, useEffect } from "react";
import Image from "next/image";
import NaverLoginButton from "./NaverLoginButton";

type Props = {
  onClose: () => void;
};

export default function LoginPopup({ onClose }: Props) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

 return (
   <div ref={popupRef} className="absolute top-[150%] left-[-220%] z-10">
     <Image
       src={"/assets/close.png"}
       alt="close"
       onClick={onClose}
       className="relative left-260 cursor-pointer"
       width={28}
       height={28}
     />
     <div className="absolute rounded-20 bg-white p-20 whitespace-nowrap shadow-[0_0_3px_#D9D9D9]">
       <div className="mb-9 font-title-20">간편 로그인</div>
       <div className="mb-20 font-basic-16 text-gray-400">
         회원가입 후 다양한 기능을 사용해보세요.
       </div>
       <div className="flex justify-center">
         <NaverLoginButton />
       </div>
     </div>
   </div>
 );

}
