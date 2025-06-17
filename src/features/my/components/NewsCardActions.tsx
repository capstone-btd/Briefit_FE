import IconButton from "@/features/common/IconButton";

type NewsCardActionsProps = {
  onScrapClick: () => void;
  onEditClick: () => void;
};

export function NewsCardActions({
  onScrapClick,
  onEditClick,
}: NewsCardActionsProps) {
  return (
    <div className="z-10 flex gap-15">
      <IconButton
        iconName="scrap"
        className="h-45 w-45 cursor-pointer rounded-full bg-purple-50 hover:!bg-purple-50"
        isActive={true}
        alt="스크랩"
        onClick={onScrapClick}
      />
      <IconButton
        iconName="pencil-purple"
        className="h-45 w-45 cursor-pointer rounded-full bg-purple-50 hover:!bg-purple-50"
        alt="커스텀"
        onClick={onEditClick}
      />
    </div>
  );
}
