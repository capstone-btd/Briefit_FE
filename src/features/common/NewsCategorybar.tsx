"use client";

import { useRouter, usePathname } from "next/navigation";
import { newsCategories } from "@/constants/newsCategries";
import { NewsCategory } from "@/types/news/newsCategory";

function NewsCategoryItem({
  category,
  isSelected,
  onClick,
}: {
  category: NewsCategory;
  isSelected: boolean;
  onClick: (name: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(category.name)}
      className={`font-basic-16 rounded-full px-16 py-6 transition-colors duration-200 ${
        isSelected ? "bg-purple-500 text-white" : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      {category.label}
    </button>
  );
}

export default function NewsCategoryBar() {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const currentCategory =
    lastSegment === "today-news" || !lastSegment
      ? ""
      : decodeURIComponent(lastSegment);

  const onCategorySelected = (name: string) => {
    router.push(`/today-news/${name}`);
  };

  return (
    <div className="-mx-4 overflow-x-auto px-4">
      <div className="flex w-max min-w-full gap-10">
        {newsCategories.map((cat) => (
          <NewsCategoryItem
            key={cat.id}
            category={cat}
            isSelected={currentCategory === cat.name}
            onClick={onCategorySelected}
          />
        ))}
      </div>
    </div>
  );
}
