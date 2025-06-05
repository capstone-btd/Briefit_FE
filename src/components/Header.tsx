import Logo from "./Logo";
import Navigationbar from "./Navigatonbar";
import Searchbar from "./Searchbar";

export default function Header() {
  return (
    <header className="mx-16 mt-28 flex justify-between xl:mx-100 2xl:mx-150">
      <Navigationbar />
      <div className="mt-[-18px] flex items-center gap-4 xl:gap-25 2xl:gap-35">
        <Searchbar />
        <button className="font-basic-16 aspect-[80/20] w-[6vw] max-w-80 rounded-full border border-purple-500 p-10 text-purple-500">
          로그인
        </button>
      </div>
    </header>
  );
}
