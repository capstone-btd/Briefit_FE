// 해당 타입의 변수를 각 페이지 경로에서 받아
// 뉴스 카테고리 및 적절한 searchParameters를 파싱합니다.

export type NewsPathParams = {
  params: {
    category: string;
  };
  searchParams?: {
    [key: string]: string | undefined;
  };
};

