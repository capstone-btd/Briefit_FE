import ResponsiveImage from "./ResponsiveImage";

export default function UserProfileImage() {
  return (
    <ResponsiveImage
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      alt="프로필 이미지"
      rounded="full"
      ratio={1}
      className="h-45 w-45"
    ></ResponsiveImage>
  );
}
