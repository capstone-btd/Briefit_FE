"use client";
import { useState } from "react";
import SignUpStepInfo from "./SignUpStepInfo";
import SignUpStepCategory from "./SignUpStepCategory";
import SignUpStepComplete from "./SignUpStepComplete";
import SignUpStepsIcons from "./SignUpStepsIcons";
import { X } from "lucide-react";
import { useSignUpStore } from "@/stores/signUp/useSignUpStore";
import registerUser from "../api/signup";
import { useAuthStore } from "@/stores/auth/useAuthStore";


interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignUpModal({ open, onClose }: SignUpModalProps) {
  const [step, setStep] = useState(0);
  const name = useSignUpStore((state) => state.name);
  const categories = useSignUpStore((state) => state.categories);

  const handleRegister = async () => {
    try {
      await registerUser(name, categories);
      useAuthStore.setState({ isNew: false }); // 로컬 스토리지 상태 업데이트
      setStep(2); // 완료 단계로 이동
    } catch (e) {
      alert("회원가입에 실패했습니다.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-35 shadow-xl">
        <X
          onClick={onClose}
          strokeWidth={1.5}
          color="gray"
          className="absolute top-20 right-20 size-20"
        />

        {step === 2 ? (
          <SignUpStepComplete />
        ) : (
          <div className="flex flex-col items-center justify-center px-30">
            <h2 className="text-19 my-30 font-semibold">회원 가입</h2>

            <SignUpStepsIcons currentStep={step} />

            {step === 0 && <SignUpStepInfo onNext={() => setStep(1)} />}
            {step === 1 && (
              <SignUpStepCategory
                onPrev={() => setStep(0)}
                onNext={handleRegister}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
