export default function Divider({
  widthClass = "w-full",
  className = "",
}: {
  widthClass?: string;
  className?: string;
}) {
  return <div className={`h-1 ${className || "bg-gray-100"} ${widthClass}`} />;
}
