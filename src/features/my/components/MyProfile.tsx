"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newsCategories } from "@/constants/newsCategries";
import { NewsCategoryItem } from "@/features/common/NewsCategorybar";
import EditableField from "./EditableField";
import { isLoggedInUser, useAuthStore } from "@/stores/auth/useAuthStore";
import NoContent from "@/features/common/NoContent";

export default function MyProfile() {
  const isUser = useAuthStore(isLoggedInUser);
  const [name, setName] = useState("김땡땡");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "경제",
    "문화",
  ]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <div>
      <div className="mb-50 font-title-24">나의 프로필</div>
      {isUser ? (
        <div className="grid place-items-center gap-20">
          <Image
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="프로필 사진"
            width={150}
            height={150}
            className="mb-40 aspect-square rounded-full"
          />
          <EditableField
            title="이름"
            displayValue={name}
            isActive={name !== ""}
            onSave={() => console.log("이름 저장됨")}
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`h-48 rounded-10 bg-gray-50 pl-10 font-basic-16 focus-visible:ring-0 ${name === "" ? "" : "focus-visible:border-purple-500"}`}
            />
          </EditableField>

          <EditableField
            title="관심 분야"
            displayValue={selectedCategories.join(", ")}
            isActive={selectedCategories.length !== 0}
            onSave={() => console.log("관심분야 저장됨")}
          >
            <div className="grid grid-cols-4 gap-8">
              {newsCategories.slice(1).map((cat) => (
                <NewsCategoryItem
                  key={cat.id}
                  category={cat}
                  isSelected={selectedCategories.includes(cat.label)}
                  onClick={() => toggleCategory(cat.label)}
                />
              ))}
            </div>
          </EditableField>
          <Button className="mt-15 cursor-pointer bg-transparent font-small-14 text-red-100 hover:bg-transparent">
            회원 탈퇴하기
          </Button>
        </div>
      ) : (
        <NoContent message="로그인 후 사용 가능해요." />
      )}
    </div>
  );
}
