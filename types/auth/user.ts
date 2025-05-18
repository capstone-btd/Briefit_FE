// 유저 모델

export type User = {
  id: string;
  provider: 'NAVER' | 'KAKAO';
  nickname: string;
  profileImage?: string;
  preferredCategories: string[]; // 타입 수정 필요  
  preferredTags: string[]; // 타입 수정 필요
  scrapedInfo: any[] // 타입 수정 필요
};
