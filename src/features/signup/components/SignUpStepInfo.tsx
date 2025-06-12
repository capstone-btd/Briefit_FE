import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUpStore } from "@/stores/signUp/useSignUpStore";
import { Check } from "lucide-react";
import { useState } from "react";

export default function SignUpStepInfo({ onNext }: { onNext: () => void}) {
  const [profileImg, setProfileImg] = useState("bg-pink-profile");

  const name = useSignUpStore((state) => state.name);
  const setName = useSignUpStore((state) => state.setName);

  const profileColors = [
    "bg-pink-profile",
    "bg-beige-profile",
    "bg-yellow-profile",
    "bg-green-profile",
    "bg-blue-profile",
    "bg-brown-profile",
  ];

  return (
    <div className="flex flex-col items-center mb-70">
      <div
        className={`size-100 rounded-full ${profileImg} transition-colors duration-700 mb-30`}
      />
      <div className="grid w-full items-center gap-3 mb-20">
        <Label htmlFor="name" className="p-5 font-normal">이름</Label>
        <Input
          type="text"
          placeholder="이름을 입력해주세요."
          className="rounded-sm border-none bg-gray-50 px-10 py-20"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <p className="text-sm font-normal pl-2 my-10">프로필 사진</p>
        <div className="grid grid-cols-3 gap-10">
          {profileColors.map((color) => {
            const isSelected = profileImg === color;
            return (
              <div
                key={color}
                onClick={() => setProfileImg(color)}
                className={`relative flex mx-0 size-50 cursor-pointer items-center justify-center overflow-hidden rounded-full`}
              >
                {/* 선택 시 어두운 오버레이 + 체크 */}
                <div
                  className={`absolute inset-0 rounded-full transition-colors duration-200 ${isSelected ? "bg-black/10" : "bg-transparent"} `}
                />
                {isSelected && (
                  <Check
                    className="absolute text-white transition-opacity duration-800"
                    size={24}
                  />
                )}
                {/* 실제 컬러 */}
                <div className={`${color} h-full w-full rounded-full`} />
              </div>
            );
          })}
        </div>
      </div>
      <Button className={`absolute bottom-30 right-30 px-10 py-14 hover:bg-inherited cursor-pointer rounded-md ${!name ? "cursor-not-allowed bg-gray-100 text-gray-800" : "bg-purple-500 text-white"}`}
        onClick={onNext}
        disabled={!name}>다음</Button>
    </div>
  );
}
