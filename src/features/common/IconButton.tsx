"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

type IconButtonProps = {
  iconName: string; // assets/ 아래 파일 이름 (확장자 제외)
  isActive?: boolean; // optional, 없을 경우 기본 값 사용
  onClick: () => void;
  alt?: string;
  className?: string;
  style?: React.CSSProperties; // ✅ style props 추가
};

export default function IconButton({
  iconName,
  isActive,
  onClick,
  alt = iconName,
  className = "aspect-square w-46",
  style = {},
}: IconButtonProps) {
  const imgSrc =
    isActive === undefined
      ? `/assets/${iconName}.png`
      : `/assets/${iconName}-${isActive ? "active" : "inactive"}.png`;

  return (
    <Button
      variant="ghost"
      className={`${className} hover:bg-transparent`}
      onClick={onClick}
      style={style}
    >
      <Image src={imgSrc} alt={alt} width={46} height={46} />
    </Button>
  );
}
