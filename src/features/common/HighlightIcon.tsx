import Image from "next/image";

interface HighlightIconProps {
  tipColor: string | null;
  activeIcon:
    | "highlighter"
    | "eraser"
    | "theme"
    | "undo"
    | "redo"
    | "done"
    | "";
  onClick: () => void;
}

export default function HighlightIcon({
  tipColor,
  activeIcon,
  onClick,
}: HighlightIconProps) {
  const getHighlightImageSrc = () => {
    if (activeIcon === "highlighter" && tipColor) {
      return `/assets/custom/${tipColor}.png`;
    } else {
      return "/assets/custom/default-highlight.png";
    }
  };

  return (
    <Image
      src={getHighlightImageSrc()}
      alt="highlight"
      width={27}
      height={27}
      onClick={onClick}
      className="cursor-pointer rounded-md p-2 hover:bg-purple-100"
    />
  );
}
