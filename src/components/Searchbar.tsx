"use client";

import IconButton from "@/features/common/IconButton";

type SearchbarProps = {
  className?: string;
  searchIconSize?: number;
};

export default function Searchbar({
  className = "",
  searchIconSize = 27,
}: SearchbarProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="input-gradient-border relative h-full w-full from-purple-500 to-green-500">
        <input
          className="input-inner h-full w-full pr-12 font-basic-16 placeholder-gray-200"
          placeholder="검색어를 입력하세요."
        />
        <IconButton
          iconName="search"
          className="absolute top-1/2 right-16 -translate-y-1/2"
          onClick={() => {}}
          style={{ width: searchIconSize, height: searchIconSize }}
        />
      </div>
    </div>
  );
}
