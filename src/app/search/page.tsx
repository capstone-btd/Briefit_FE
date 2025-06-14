import SearchResult from "@/features/search/components/SearchResult";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  return <SearchResult keyword={keyword}/>;
}
