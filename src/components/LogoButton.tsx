import { navItems } from "@/constants/navItems";
import { useNavigation } from "@/hooks/useNavigation";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import Image from "next/image";
import Link from "next/link";

export default function LogoButton({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const { selectedPath, setSelectedPath } = useNavStore();
  const { handleClick } = useNavigation(selectedPath, setSelectedPath);
  return (
    <Link
      prefetch
      href={navItems[0].path}
      onClick={() => handleClick(0, navItems[0].path)}
    >
      <Image
        src="/assets/logo.png"
        alt="Breifit"
        width={width}
        height={height}
      />
    </Link>
  );
}
