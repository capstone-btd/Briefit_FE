export function formatKoreanDateTime({
  isoString,
  needUnitText = false,
}: {
  isoString: string;
  needUnitText?: boolean;
}): string {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  let hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");

  const isPM = hour >= 12;
  const period = isPM ? "오후" : "오전";

  hour = hour % 12;
  if (hour === 0) hour = 12;

  return needUnitText
    ? `${year}.${month}.${day}. ${period} ${hour}시 ${minute}분`
    : `${year}.${month}.${day}. ${period} ${hour}:${minute}`;
}