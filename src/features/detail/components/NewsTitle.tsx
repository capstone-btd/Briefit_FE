import { formatKoreanDateTime } from "@/utils/dateTimeStringFormatter";

export default function NewsTitle({
  categoryLabel,
  pressCompanies,
  title,
  createdAt,
}: {
  categoryLabel: string;
  pressCompanies: string[];
  title: string;
  createdAt: string;
}) {
  return (
    <div className="mt-50 gap-20">
      <div className="mb-16 flex items-center gap-30">
        <div className="font-title-24-m">{categoryLabel}</div>
        <div className="font-basic-20 text-gray-400">
          {pressCompanies.join(", ")}
        </div>
      </div>
      <div className="font-title-40 mb-50">{title}</div>
      <div className="font-basic-16 mb-17 flex justify-end text-gray-600">
        생성일자: {formatKoreanDateTime({isoString:createdAt})}
      </div>
    </div>
  );
}
