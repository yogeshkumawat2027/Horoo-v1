"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import {
  loginUser,
  registerUser,
  type AuthUser,
  type UserRole,
} from "@/lib/auth";

type AuthMode = "login" | "signup";

type AuthFormProps = {
  defaultMode?: AuthMode;
  defaultRole?: UserRole;
  onSuccess?: (user: AuthUser) => void;
};

export default function AuthForm({
  defaultMode = "login",
  defaultRole = "user",
  onSuccess,
}: AuthFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    try {
      const response =
        mode === "login"
          ? await loginUser(email, password)
          : await registerUser({ name, email, password, role });

      if (response.user) {
        onSuccess?.(response.user);
        router.refresh();
      }
    } catch (authError) {
      setError(
        authError instanceof Error ? authError.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 grid grid-cols-2 border border-gray-200 bg-gray-50 p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`px-3 py-2 text-sm font-bold ${
            mode === "login"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-gray-600"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`px-3 py-2 text-sm font-bold ${
            mode === "signup"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-gray-600"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <>
            <label className="block space-y-1 text-sm font-semibold text-gray-700">
              Full Name
              <input
                name="name"
                required
                className="w-full border border-gray-200 px-3 py-2.5 outline-none focus:border-orange-500"
              />
            </label>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-gray-700">
                Account Type
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(["user", "owner"] as UserRole[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRole(option)}
                    className={`border px-3 py-2 text-sm font-bold capitalize ${
                      role === option
                        ? "border-orange-600 bg-orange-50 text-orange-700"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <label className="block space-y-1 text-sm font-semibold text-gray-700">
          Email
          <input
            name="email"
            type="email"
            required
            className="w-full border border-gray-200 px-3 py-2.5 outline-none focus:border-orange-500"
          />
        </label>

        <label className="block space-y-1 text-sm font-semibold text-gray-700">
          Password
          <div className="flex border border-gray-200 focus-within:border-orange-500">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              className="w-full px-3 py-2.5 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="px-3 text-gray-500 hover:text-orange-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </label>

        {error && (
          <div className="border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <button
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 bg-orange-600 px-4 py-3 text-sm font-bold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {mode === "login" ? (
            <LogIn className="h-4 w-4" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )}
          {isSubmitting
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : "Create Account"}
        </button>
      </form>
    </div>
  );
}
