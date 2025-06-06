"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const ActiveButton = {
  SCRAP: "scrap",
  SHARE: "share",
  EDIT: "edit",
} as const;

type ActiveButtonType = (typeof ActiveButton)[keyof typeof ActiveButton];

export default function NewsPageHeader() {
  const [active, setActive] = useState<ActiveButtonType | null>(null);
  const isActive = (key: ActiveButtonType) => active === key;

  return (
    <div className="flex items-center gap-15">
      <Button
        variant="ghost"
        className="aspect-square w-46 hover:bg-transparent"
        onClick={() =>
          setActive(active === ActiveButton.SCRAP ? null : ActiveButton.SCRAP)
        }
      >
        <img
          src={`/assets/scrap-${isActive(ActiveButton.SCRAP) ? "active" : "inactive"}.png`}
          alt="스크랩"
        />
      </Button>

      <Button
        variant="ghost"
        className="aspect-square w-46 hover:bg-transparent"
        onClick={() =>
          setActive(active === ActiveButton.SHARE ? null : ActiveButton.SHARE)
        }
      >
        <img
          src={`/assets/share-${isActive(ActiveButton.SHARE) ? "active" : "inactive"}.png`}
          alt="공유"
        />
      </Button>

      <Button
        variant="ghost"
        className="aspect-square w-46 hover:bg-transparent"
        onClick={() =>
          setActive(active === ActiveButton.EDIT ? null : ActiveButton.EDIT)
        }
      >
        <img
          src={`/assets/pencil-${isActive(ActiveButton.EDIT) ? "active" : "inactive"}.png`}
          alt="편집"
        />
      </Button>
    </div>
  );
}
