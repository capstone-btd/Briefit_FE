import { Button } from "@/components/ui/button";

export default function NewsPageHeader() {
  return (
    <div className="flex items-center gap-15">
      <Button variant="ghost"  className="aspect-square w-46">
        <img src={"/assets/scrap.png"} />
      </Button>
      <Button variant="ghost"  className="aspect-square w-46">
        <img src={"/assets/share.png"} />
      </Button>
      <Button variant="ghost"  className="aspect-square w-46">
        <img src={"/assets/pencil.png"} />
      </Button>
    </div>
  );
}
