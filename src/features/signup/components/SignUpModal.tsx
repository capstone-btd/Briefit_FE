'use client';
import { useState } from "react";
import SignUpStepInfo from "./SignUpStepInfo";
import SignUpStepCategory from "./SignUpStepCategory";
import SignUpStepComplete from "./SignUpStepComplete";
import { Button } from "@/components/ui/button"

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignUpModal({open, onClose}: SignUpModalProps) {
  const [step, setStep] = useState(0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
      <Button onClick={onClose} variant="secondary" size="icon" className="size-8">
        x
      </Button>
      <h2>회원가입</h2>
      
      <div></div>

      {step === 0 && <SignUpStepInfo />}
      {step === 1 && <SignUpStepCategory />}
      {step === 2 && <SignUpStepComplete />}

      <div className="flex justify-between">
        <Button onClick={() => setStep(step - 1)} className="">이전</Button>
        <Button onClick={() => setStep(step + 1)}>다음</Button>
      </div>
      </div>
    </div>
  );
}