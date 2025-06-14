import Searchbar from "@/components/Searchbar";
import { DetailPageType } from "@/constants/detailPageType";
import Divider from "@/features/common/Divider";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import { dummyNews } from "@/mock/dummyNews";

type SearchProps = {
  keyword: string;
};

export default function SearchResult({ keyword }: SearchProps) {
  return (
    <div>
      <Searchbar
        id="search"
        className="mx-auto h-48 w-[35vw]"
        searchIconSize={35}
      />
      <div className="mb-35 font-title-24">
        &quot;{keyword}&quot;에 대한 검색 결과
      </div>
      <Divider />
      <div className="mx-20 mt-60">
        <PaginatedNewsCardGrid
          itemsPerPage={6}
          newsList={dummyNews}
          categoryLabel={null}
          type={DetailPageType.TODAY}
        />
      </div>
    </div>
  );
}
