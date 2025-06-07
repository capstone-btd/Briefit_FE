// constants/roles.ts
export const DetailPageType = {
  TODAY: "/today-news",
  RECOMMENDED: "/recommended-news",
  MY: "/my",
} as const;

export type DetailPageType = (typeof DetailPageType)[keyof typeof DetailPageType];
