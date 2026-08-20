"use client";

import { X } from "lucide-react";
import AuthForm from "@/components/auth/AuthForm";
import type { UserRole } from "@/lib/auth";

type AuthModalProps = {
  isOpen: boolean;
  mode: "login" | "signup";
  role?: UserRole;
  onClose: () => void;
};

export default function AuthModal({
  isOpen,
  mode,
  role = "user",
  onClose,
}: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Welcome to Horoo
            </h2>
            <p className="text-sm text-gray-600">
              Login or create your account.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-orange-600"
            aria-label="Close auth dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <AuthForm defaultMode={mode} defaultRole={role} onSuccess={onClose} />
      </div>
    </div>
  );
}
