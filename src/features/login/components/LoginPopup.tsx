// components/LoginPopup.tsx
import { useRef, useEffect } from "react";
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
   <div
     ref={popupRef}
     className="absolute top-[150%] left-[-220%] z-10"
   >
     <img
       src={"/assets/close.png"}
       alt="close"
       onClick={onClose}
       className="relative left-[260px] h-28 w-28 cursor-pointer"
     />
     <div className="rounded-20 absolute bg-white p-20 whitespace-nowrap shadow-[0_0_3px_#D9D9D9]">
       <div className="font-title-20 mb-9">간편 로그인</div>
       <div className="font-basic-16 mb-20 text-gray-400">
         회원가입 후 다양한 기능을 사용해보세요.
       </div>
       <div className="flex justify-center">
         <NaverLoginButton />
       </div>
     </div>
   </div>
 );

}
