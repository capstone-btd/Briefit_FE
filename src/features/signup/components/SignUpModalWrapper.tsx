"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import SignUpModal from "./SignUpModal";

export default function SignUpModalWrapper() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isNew = useAuthStore((state) => state.isNew);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn && isNew) {
      setOpen(true);
    }
  }, [isLoggedIn, isNew]);

  if (!open) return null;

  return <SignUpModal open={open} onClose={() => setOpen(false)} />;
}
