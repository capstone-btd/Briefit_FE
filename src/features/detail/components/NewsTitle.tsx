import { formatKoreanDateTime } from "@/utils/dateTimeStringFormatter";
import { getPressCompanyNameString } from "@/utils/news/getPressCompanyNameString";

export default function NewsTitle({
  categoryLabel,
  pressCompanies,
  title,
  createdAt,
  themeTextColor1,
  themeTextColor2,
}: {
  categoryLabel: string;
  pressCompanies: string[];
  title: string;
  createdAt: string;
  themeTextColor1?: string | null;
  themeTextColor2?: string | null;
}) {
  return (
    <div className="mt-50 gap-20">
      <div className="mb-16 flex items-center gap-30">
        <div className={`font-title-24-m sm:hidden ${themeTextColor1 ?? ""}`}>
          {categoryLabel}
        </div>
        <div
          className={`hidden rounded-full bg-purple-100 px-8 py-2 text-13 font-normal sm:block ${themeTextColor1 ?? ""}`}
        >
          {categoryLabel}
        </div>
        <div
          className={`font-light-14 hidden sm:block ${!!themeTextColor2 ? themeTextColor2 : "text-gray-400"}`}
        >
          {getPressCompanyNameString(pressCompanies)}
        </div>
        <div className="block font-basic-20 sm:hidden">
          {getPressCompanyNameString(pressCompanies)}
        </div>
      </div>
      <div
        className={`mb-50 xl:text-40 xl:font-semibold sm:text-20 sm:font-medium md:text-40 md:font-semibold ${themeTextColor1 ?? ""}`}
      >
        {title}
      </div>
      <div
        className={`mb-17 flex justify-end font-basic-16 ${themeTextColor2 ?? "text-gray-600"}`}
      >
        생성일자: {formatKoreanDateTime({ isoString: createdAt })}
      </div>
    </div>
  );
}
