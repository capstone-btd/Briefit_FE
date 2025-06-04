export default function Searchbar() {
  return (
    <div className="w-full max-w-[277px] aspect-[277/50]">
      <div className="input-gradient-border from-purple-500 to-green-500 w-full h-full">
        <input
          className="input-inner font-basic-16 placeholder-gray-400"
          placeholder="검색어를 입력하세요."
        />
      </div>
    </div>
  );
}
