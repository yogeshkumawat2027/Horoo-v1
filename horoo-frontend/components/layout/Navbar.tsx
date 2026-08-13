"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaBed,
  FaHome,
  FaBuilding,
  FaWarehouse,
  FaHotel,
  FaUser,
  FaSignOutAlt,
  FaUserFriends,
} from "react-icons/fa";

interface User {
  name: string;
  email: string;
  profilePicture?: string;
}

interface PropertyType {
  name: string;
  icon: React.ElementType;
  href: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isPropertiesDropdownOpen, setIsPropertiesDropdownOpen] =
    useState<boolean>(false);
  const [isMobilePropertiesOpen, setIsMobilePropertiesOpen] =
    useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] =
    useState<boolean>(false);

  // Check if user is logged in
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const userData = localStorage.getItem("user");

    if (userToken && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Invalid user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMobilePropertiesOpen(false);
  };

  const togglePropertiesDropdown = () => {
    setIsPropertiesDropdownOpen(!isPropertiesDropdownOpen);
  };

  const toggleMobileProperties = () => {
    setIsMobilePropertiesOpen(!isMobilePropertiesOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");

    setUser(null);
    setIsUserDropdownOpen(false);

    window.location.reload();
  };

  const propertyTypes: PropertyType[] = [
    {
      name: "Rooms",
      icon: FaBed,
      href: "/rooms",
    },
    {
      name: "Flats",
      icon: FaBuilding,
      href: "/flats",
    },
    {
      name: "Hostels",
      icon: FaUserFriends,
      href: "/hostels",
    },
    {
      name: "House",
      icon: FaHome,
      href: "/house",
    },
    {
      name: "Commercials",
      icon: FaWarehouse,
      href: "/commercials",
    },
    {
      name: "Hotel Rooms",
      icon: FaHotel,
      href: "/hotels",
    },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-[50]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-20">

          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-4"
            >
              <div className="relative w-14 h-14">
                <Image
                  src="/logo/LogoOfHoroo.jpg"
                  alt="Horoo Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <span className="text-3xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
                Horoo
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">

            {/* Rentals Dropdown */}
            <div className="relative group">

              <button
                onClick={togglePropertiesDropdown}
                onMouseEnter={() =>
                  setIsPropertiesDropdownOpen(true)
                }
                className="flex items-center space-x-2 text-lg text-gray-600 hover:text-orange-600 font-semibold transition-colors duration-200"
              >
                <span>Rentals</span>

                <FaChevronDown
                  className={`text-sm transition-transform duration-200 ${
                    isPropertiesDropdownOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-3 transition-all duration-200 ${
                  isPropertiesDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
                onMouseLeave={() =>
                  setIsPropertiesDropdownOpen(false)
                }
              >
                {propertyTypes.map((property, index) => {
                  const IconComponent = property.icon;

                  return (
                    <Link
                      key={index}
                      href={property.href}
                      className="flex items-center space-x-4 px-5 py-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                      onClick={() =>
                        setIsPropertiesDropdownOpen(false)
                      }
                    >
                      <IconComponent className="text-orange-500 text-base" />

                      <span className="font-semibold text-base">
                        {property.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Contact */}
            <Link
              href="/contact"
              className="text-lg text-gray-600 hover:text-orange-600 font-semibold transition-colors duration-200"
            >
              Contact
            </Link>

            {/* List Rental */}
            <Link
              href="/list-rental"
              className="text-lg text-gray-600 hover:text-orange-600 font-semibold transition-colors duration-200"
            >
              List Rental
            </Link>

            {/* User Authentication */}
            {user ? (
              <div className="relative">

                <button
                  onClick={() =>
                    setIsUserDropdownOpen(
                      !isUserDropdownOpen
                    )
                  }
                  onMouseEnter={() =>
                    setIsUserDropdownOpen(true)
                  }
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className="font-semibold">
                    {user.name.split(" ")[0]}
                  </span>

                  <FaChevronDown className="text-sm" />
                </button>

                {/* User Dropdown */}
                <div
                  className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 transition-all duration-200 ${
                    isUserDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                  onMouseLeave={() =>
                    setIsUserDropdownOpen(false)
                  }
                >
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    onClick={() =>
                      setIsUserDropdownOpen(false)
                    }
                  >
                    <FaUser />
                    <span>My Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-red-600 transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">

                <button
                  className="text-orange-600 hover:text-orange-700 font-semibold px-4 py-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
                >
                  Login
                </button>

                <button
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                >
                  Sign Up
                </button>

              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-orange-600 focus:outline-none focus:text-orange-600 transition-colors p-2"
            >
              {isMenuOpen ? (
                <FaTimes size={28} />
              ) : (
                <FaBars size={28} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-[59] md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[60] md:hidden ${
            isMenuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">

            <Link
              href="/"
              className="flex items-center space-x-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative w-8 h-8">
                <Image
                  src="/logo/logo.jpg"
                  alt="Horoo Logo"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>

              <span className="text-lg font-bold text-orange-600">
                Horoo
              </span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 hover:text-orange-600 transition-colors p-2"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="px-4 py-3 space-y-2 overflow-y-auto h-full pb-20">

            {/* Home */}
            <Link
              href="/"
              className="block px-4 py-4 text-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl font-semibold transition-all duration-200 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* Rentals */}
            <div className="border-b border-gray-100">

              <button
                onClick={toggleMobileProperties}
                className="flex items-center justify-between w-full px-4 py-4 text-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl font-semibold transition-all duration-200"
              >
                <span>Rentals</span>

                <FaChevronDown
                  className={`text-sm transition-transform duration-200 ${
                    isMobilePropertiesOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* Mobile Properties Submenu */}
              <div
                className={`transition-all duration-300 ${
                  isMobilePropertiesOpen
                    ? "max-h-96 opacity-100 pb-2"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="bg-gray-50 rounded-lg mx-2 p-2 space-y-1">

                  {propertyTypes.map(
                    (property, index) => {
                      const IconComponent =
                        property.icon;

                      return (
                        <Link
                          key={index}
                          href={property.href}
                          className="flex items-center space-x-4 px-4 py-3 text-gray-600 hover:text-orange-600 hover:bg-white rounded-lg transition-all duration-200"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobilePropertiesOpen(false);
                          }}
                        >
                          <IconComponent className="text-orange-500 text-base" />

                          <span className="text-base font-medium">
                            {property.name}
                          </span>
                        </Link>
                      );
                    }
                  )}

                </div>
              </div>
            </div>

            {/* About */}
            <Link
              href="/about"
              className="block px-4 py-4 text-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl font-semibold transition-all duration-200 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className="block px-4 py-4 text-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl font-semibold transition-all duration-200 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* List Rental */}
            <Link
              href="/list-rental"
              className="block px-4 py-4 text-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl font-semibold transition-all duration-200 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              List Rental
            </Link>

            {/* User Authentication - Mobile */}
            {user ? (
              <div className="border-t border-gray-200 pt-3 mt-3">

                <div className="flex items-center space-x-3 px-4 py-3 bg-orange-50 rounded-lg">

                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-800">
                      {user.name}
                    </p>

                    <p className="text-sm text-gray-600">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center space-x-3 px-4 py-3 mt-2 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUser />
                  <span>My Profile</span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-3 border-t border-gray-200 mt-3">

                <button
                  className="w-full bg-white border-2 border-orange-600 text-orange-600 font-semibold px-4 py-3 rounded-lg hover:bg-orange-50 transition-all duration-200"
                >
                  Login
                </button>

                <button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-200"
                >
                  Sign Up
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}