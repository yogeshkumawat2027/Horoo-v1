"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/components/auth/AuthModal";
import OwnerBenefits from "@/components/list-rental/OwnerBenefits";
import HelpSupport from "@/components/list-rental/HelpSupport";
import {
  clearAuthUser,
  getStoredUser,
  type AuthUser,
} from "@/lib/auth";
import {
  FaPhone,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

export default function ListRentalPage() {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: "login" | "signup";
  }>({
    isOpen: false,
    mode: "login",
  });

  // Get current logged-in user
  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);

    const handleUserChange = (event: Event) => {
      const customEvent = event as CustomEvent<AuthUser | null>;
      setUser(customEvent.detail);
    };

    window.addEventListener(
      "auth:user-changed",
      handleUserChange
    );

    return () => {
      window.removeEventListener(
        "auth:user-changed",
        handleUserChange
      );
    };
  }, []);

  // Open login modal
  const openLogin = () => {
    setAuthModal({
      isOpen: true,
      mode: "login",
    });
  };

  // Open signup modal
  const openSignup = () => {
    setAuthModal({
      isOpen: true,
      mode: "signup",
    });
  };

  // List property button
  const handleListProperty = () => {
    if (!user) {
      openLogin();
      return;
    }

    // User is already logged in
    // Change this route later if your owner listing page is different
    window.location.href = "/owner-dashboard";
  };

  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <section className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
            List with Horoo
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-950 md:text-4xl">
            List your rental property
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
            Add rooms, flats, hostels, houses or commercial spaces
            and manage enquiries from one owner account.
          </p>

          {/* Login / Signup message */}
          {!user && (
            <p className="mt-4 text-sm text-gray-600">
              To list your property, please{" "}
              <button
                onClick={openLogin}
                className="font-semibold text-orange-600 hover:text-orange-700 hover:underline"
              >
                Login
              </button>{" "}
              or{" "}
              <button
                onClick={openSignup}
                className="font-semibold text-orange-600 hover:text-orange-700 hover:underline"
              >
                Sign Up
              </button>{" "}
              first.
            </p>
          )}

          {/* CTA */}
          <button
            onClick={handleListProperty}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
          >
            {user ? "List Your Property" : "Login for Dashboard"}

            <FaArrowRight className="text-xs" />
          </button>

        </div>
      </section>


      {/* Benefits + Support */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          <OwnerBenefits />

          <HelpSupport />

        </div>

      </section>


      {/* Contact */}
      <section className="border-t border-gray-100">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <div>
            <h2 className="font-semibold text-gray-900">
              Need help?
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Contact us if you need help listing your property.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-6">

            <a
              href="tel:+918279053200"
              className="flex items-center gap-2 text-gray-700 transition hover:text-orange-600"
            >
              <FaPhone className="text-orange-600" />
              +91 8279053200
            </a>

            <a
              href="mailto:horoobooking@gmail.com"
              className="flex items-center gap-2 text-gray-700 transition hover:text-orange-600"
            >
              <FaEnvelope className="text-orange-600" />
              horoobooking@gmail.com
            </a>

          </div>

        </div>

      </section>


      {/* Existing Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() =>
          setAuthModal((modal) => ({
            ...modal,
            isOpen: false,
          }))
        }
      />

    </main>
  );
}