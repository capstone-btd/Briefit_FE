import Searchbar from "@/components/Searchbar";
import { DetailPageType } from "@/constants/detailPageType";
import Divider from "@/features/common/Divider";
import PaginatedNewsCardGrid from "@/features/common/PaginatedNewsCardGrid";
import fetchNewsCardListByKeyword from "../api/search";
import NoContent from "@/features/common/NoContent";

type SearchProps = {
  keyword: string;
};

export default async function SearchResult({ keyword }: SearchProps) {
  const newsList = await fetchNewsCardListByKeyword({ keyword: keyword });

  return (
    <div>
      <Searchbar
        id="search"
        className="mx-auto h-48 w-[35vw]"
        searchIconSize={35}
      />
      <div className="my-35 font-title-24">
        &quot;{keyword}&quot;에 대한 검색 결과
      </div>
      <Divider />
      <div className="mx-20 mt-60">
        {newsList.length === 0 ? <NoContent message="검색 결과가 없어요."/> :
          <PaginatedNewsCardGrid
            itemsPerPage={6}
            newsList={newsList}
            categoryLabel={null}
            type={DetailPageType.TODAY}
          />}
      </div>
    </div>
  );
}
