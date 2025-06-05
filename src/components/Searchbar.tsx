export default function Searchbar() {
  return (
    <div className="aspect-[277/50] w-full max-w-277">
      <div className="input-gradient-border h-full w-full from-purple-500 to-green-500">
        <input
          className="input-inner font-basic-16 placeholder-gray-400"
          placeholder="검색어를 입력하세요."
        />
      </div>
    </div>
  );
}
