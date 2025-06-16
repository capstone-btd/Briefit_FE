import Divider from "@/features/common/Divider";
import MyMenubar from "@/features/my/components/MyMenubar";
import ProfileHeader from "@/features/my/components/ProfileHeader";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ProfileHeader />
      <div className="mt-20 mb-40">
        <Divider />
      </div>
      <div className="flex gap-40">
        <div className="sticky top-30 h-fit self-start">
          <MyMenubar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
