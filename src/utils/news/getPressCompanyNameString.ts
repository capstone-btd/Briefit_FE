import { pressCompanyNameMap } from "@/constants/pressCompanyNameMap";

export function getPressCompanyNameString(pressCompanies: string[]) {
  const uniqueCompanies = [...new Set(pressCompanies)];

  const mappedNames = uniqueCompanies.map((company) => {
    return pressCompanyNameMap[company] || company; // 매핑 없으면 원래 값 사용
  });

  return mappedNames.join(", ");
}
