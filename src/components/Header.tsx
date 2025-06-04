import Logo from "./Logo";
import Navigationbar from "./Navigatonbar";
import Searchbar from "./Searchbar";

export default function Header() {
  return (
    <header className="flex justify-between mt-7 mx-4 xl:mx-[100px] 2xl:mx-[150px]">
      <Navigationbar />
      <div className="flex items-center mt-[-18px] gap-4 xl:gap-[25px] 2xl:gap-[35px]">
        <Searchbar />
        <button className="font-basic-16 text-purple-500 border border-purple-500 rounded-full p-[10px] w-[6vw] aspect-[80/20] max-w-[80px]">
          로그인
        </button>
      </div>
    </header>
  );
}
