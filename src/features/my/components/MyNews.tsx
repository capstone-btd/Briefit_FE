import NewsCategoryBar from "@/features/common/NewsCategorybar";

export default function MyNews({
  title,
  basePath,
}: {
  title: string;
  basePath: string;
}) {
  return (
    <div className="flex gap-50">
      <div className="font-title-24">{title}</div>
      <NewsCategoryBar basePath={basePath} />
    </div>
  );
}
