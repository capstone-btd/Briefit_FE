import NewsDetail from "@/features/detail/components/NewsDetail";

type Props = {
  searchParams: Promise<{
    articleId: string;
    scrapId?: string;
    isCustomize: string;
  }>;
};

export default async function TodayNewsDetailPage({ searchParams }: Props) {
  const { articleId, scrapId, isCustomize } = await searchParams;
 
  return (
    <NewsDetail
      articleId={Number(articleId)}
      scrapId={scrapId === "null" ? null : Number(scrapId)}
      isCustomize={isCustomize === "true"}
      containsAuthHeader={false}
    />
  );
}
