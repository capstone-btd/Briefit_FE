export default function Divider({
  widthClass = "w-full",
}: {
  widthClass?: string;
}) {
  return <div className={`h-1 bg-gray-100  ${widthClass}`} />;
}
