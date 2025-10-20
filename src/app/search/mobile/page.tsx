import MobileSearchHeader from "@/features/search/components/MobileSearchHeader";
import MobileSearchResult from "@/features/search/components/MobileSearchResult";

type SearchParams = {
  keyword?: string;
  selectedPressCompanyName?: string;
};

type Props = {
  searchParams: SearchParams;
};

export default function MobileSearchPage({ searchParams }: Props) {
  const keyword = searchParams.keyword || "";
  const selectedPressCompanyName =
    searchParams.selectedPressCompanyName || null;

  return (
    <div>
      <MobileSearchHeader />
      {keyword && (
        <MobileSearchResult
          keyword={keyword}
          selectedPressCompanyName={selectedPressCompanyName}
        />
      )}
    </div>
  );
}
