"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";
import { getStoredUser, type AuthUser } from "@/lib/auth";

export default function ListRentalGate() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    queueMicrotask(() => setUser(getStoredUser()));

    const handleUserChange = (event: Event) => {
      setUser((event as CustomEvent<AuthUser | null>).detail);
    };

    window.addEventListener("auth:user-changed", handleUserChange);

    return () => {
      window.removeEventListener("auth:user-changed", handleUserChange);
    };
  }, []);

  if (user?.role === "owner") {
    return (
      <div className="border border-green-100 bg-green-50 p-5">
        <h2 className="text-xl font-bold text-gray-950">
          Your owner account is ready
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-700">
          Open your dashboard to create, edit and manage your rental listings.
        </p>
        <Link
          href="/owner-dashboard"
          className="mt-4 inline-block bg-orange-600 px-5 py-3 text-sm font-bold text-white hover:bg-orange-700"
        >
          Go to Owner Dashboard
        </Link>
      </div>
    );
  }

  if (user && user.role !== "owner") {
    return (
      <div className="border border-amber-100 bg-amber-50 p-5">
        <h2 className="text-xl font-bold text-gray-950">
          Login as an owner to list property
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-700">
          This account is registered as a tenant account. Please use an owner
          account to add rentals.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-950">
          Login or signup as owner
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Create an owner account first, then continue to list your property.
        </p>
      </div>
      <AuthForm defaultMode="signup" defaultRole="owner" />
    </div>
  );
}
