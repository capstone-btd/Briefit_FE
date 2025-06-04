import Logo from "./Logo";
import Navigationbar from "./Navigatonbar";
import Searchbar from "./Searchbar";

export default function Header() {
  return (
    <header className="flex justify-between mt-7 md:mx-[50px] lg:mx-[100px]">
      <Navigationbar />
      <div className="flex items-center gap-auto md:gap-6 lg:gap-12 mt-[-18px]">
        <Searchbar />
        <button className="font-basic-16 text-purple-500 border border-purple-500 rounded-full p-[10px]">로그인</button>
      </div>
    </header>
  );
}
