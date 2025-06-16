import MyNews from "@/features/my/components/MyNews";


export default function MyCustomPage() {
  return (
    <div>
      <MyNews title="커스텀한 기사" basePath="my/custom" />
    </div>
  );
}
