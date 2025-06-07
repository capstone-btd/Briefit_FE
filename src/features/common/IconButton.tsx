"use client";

import { Button } from "@/components/ui/button";

type IconButtonProps = {
  iconName: string; // assets/ 아래 파일 이름 (확장자 제외)
  isActive?: boolean; // optional, 없을 경우 기본 값 사용
  onClick: () => void;
  alt?: string;
  sizeClass?: string;
};

export default function IconButton({
  iconName,
  isActive,
  onClick,
  alt = iconName,
  sizeClass = "aspect-square w-46",
}: IconButtonProps) {
  const imgSrc =
    isActive === undefined
      ? `/assets/${iconName}.png`
      : `/assets/${iconName}-${isActive ? "active" : "inactive"}.png`;

  return (
    <Button
      variant="ghost"
      className={`${sizeClass} hover:bg-transparent`}
      onClick={onClick}
    >
      <img src={imgSrc} alt={alt} />
    </Button>
  );
}