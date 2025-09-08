import Image from "next/image";

export default function Logo({ width, height }: { width: number, height: number}) {
  return (
    <div>
      <Image
        src="/assets/logo.png"
        alt="Breifit Logo"
        width={width}
        height={height}
      />
    </div>
  );
}
