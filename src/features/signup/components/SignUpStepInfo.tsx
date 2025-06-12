import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpStepInfo() {
  const profileColors = [
    '#FFAD08',
    '#FF7D00',
    '#FF5200',
    '#FF0000',
    '#FF0054',
    '#FF00AA',
  ];

  return (
    <>
    <div></div>
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="name">이름</Label>
      <Input type="text" placeholder="이름을 입력해주세요." />
    </div>
    <div>
      <p>프로필 사진</p>
      {profileColors.map((color) => (
        <div key={color} className="w-10 h-10 rounded-full" style={{ backgroundColor: color }}></div>
      ))}
    </div>
    </>
  );
}