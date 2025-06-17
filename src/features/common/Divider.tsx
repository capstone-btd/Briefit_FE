export default function Divider({
  widthClass = "w-full",
}: {
  widthClass?: string;
}) {
  return <div className={`border-theme h-1 ${widthClass}`} />;
}
