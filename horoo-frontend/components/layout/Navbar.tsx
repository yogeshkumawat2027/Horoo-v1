"use client";

import Link from "next/link";
import { Menu, X, User, Search } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-xl font-bold text-white">
            H
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            HOROO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-orange-500 transition hover:text-orange-600"
          >
            Home
          </Link>

          <Link
            href="/listings"
            className="text-sm font-medium text-gray-700 transition hover:text-orange-500"
          >
            Explore
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 transition hover:text-orange-500"
          >
            About
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">

          <Link
            href="/search"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-orange-500 hover:bg-orange-50 hover:text-orange-500"
          >
            <Search size={18} />
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 transition hover:border-orange-500 hover:text-orange-500"
          >
            <User size={17} />
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-orange-50 hover:text-orange-500 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-orange-500 hover:bg-orange-50"
            >
              Home
            </Link>

            <Link
              href="/listings"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-orange-50 hover:text-orange-500"
            >
              Explore
            </Link>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-orange-50 hover:text-orange-500"
            >
              About
            </Link>

            <div className="mt-2 flex gap-2 border-t border-gray-200 pt-4">

              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 py-2.5 text-sm font-medium transition hover:border-orange-500 hover:text-orange-500"
              >
                <User size={17} />
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-full bg-orange-500 py-2.5 text-center text-sm font-medium text-white transition hover:bg-orange-600"
              >
                Get Started
              </Link>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;