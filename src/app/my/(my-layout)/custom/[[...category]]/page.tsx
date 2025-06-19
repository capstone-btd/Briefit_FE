import { MyNewsType } from "@/constants/myNewsType";
import { newsCategories } from "@/constants/newsCategries";
import MyNews from "@/features/my/components/MyNews";
import { use } from "react";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default function MyCustomPage(props: Props) {
  const { category } = use(props.params);
  const categoryLabel = category
    ? (newsCategories.find((e) => e.name === category[0])?.label ?? null)
    : null;

  return (
    <div>
      <MyNews myNewsType={MyNewsType.CUSTOM} categoryLabel={categoryLabel} />
    </div>
  );
}
