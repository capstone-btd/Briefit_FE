import { useUserStore } from "@/stores/auth/useUserStore";
import ResponsiveImage from "./ResponsiveImage";

export default function UserProfileImage() {
  const profileUrl = useUserStore((state) => state.profileUrl);
  if (!profileUrl) {
    return <div className="h-80 w-80 rounded-full bg-gray-100" />;
  }
  return (
    <ResponsiveImage
      src={profileUrl}
      alt="프로필 이미지"
      rounded="full"
      ratio={1}
      className="h-45 w-45"
    ></ResponsiveImage>
  );
}
