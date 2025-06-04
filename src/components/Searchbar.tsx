export default function Searchbar () {
    return (
      <div className="input-gradient-border from-purple-500 to-green-500 h-[48px] md:w-[230px] lg:w-[277px]">
        <input
          className="input-inner h-[44px] font-basic-16 placeholder-gray-400"
          placeholder="검색어를 입력하세요."
        />
      </div>
    );
}