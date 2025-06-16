import { useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditableFieldProps {
  title: string;
  displayValue: string;
  children: React.ReactNode;
  isActive: boolean;
  onSave?: () => void;
}

export default function EditableField({
  title,
  displayValue,
  isActive,
  children,
  onSave,
}: EditableFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    onSave?.();
    setIsOpen(false);
  };

  return (
    <div className="w-460 rounded-10 border border-gray-50 transition-all duration-300">
      <div
        className="flex cursor-pointer items-center justify-between p-20"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="font-basic-16">{title}</div>
        <div className="flex items-center gap-15">
          <div className="font-title-16">{displayValue}</div>
          {isOpen ? (
            <ChevronUp size={20} color="#d1d1d1" />
          ) : (
            <ChevronDown size={20} color="#d1d1d1" />
          )}
        </div>
      </div>

      <div
        ref={contentRef}
        className={`overflow-hidden transition-[max-height] duration-300 slide-in-from-end-translate-full ${
          isOpen ? "max-h-200" : "max-h-0"
        }`}
      >
        <div className="flex items-center justify-between gap-15 px-20 pb-20">
          <div className="w-full">{children}</div>
          <Button
            onClick={handleSave}
            className={`h-fit rounded-6 px-18 py-14 font-basic-16 ${
              isActive
                ? "bg-purple-500 text-white hover:bg-purple-800"
                : "bg-gray-50 text-gray-400 hover:bg-gray-50"
            }`}
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  );
}
