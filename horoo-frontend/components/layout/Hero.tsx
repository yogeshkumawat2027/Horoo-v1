"use client";

import Link from "next/link";
import {
  FaBed,
  FaHome,
  FaBuilding,
  FaWarehouse,
  FaSearch,
  FaUserFriends,
} from "react-icons/fa";
import { FaHotel } from "react-icons/fa";

export default function Hero() {
  const quickNavigation = [
    {
      name: "Rooms",
      icon: FaBed,
      href: "/listings?type=room",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      name: "Hostels",
      icon: FaUserFriends,
      href: "/listings?type=hostel",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      name: "Flats",
      icon: FaBuilding,
      href: "/listings?type=flat",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      name: "Hotels",
      icon: FaHotel,
      href: "/listings?type=hotel",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      name: "House",
      icon: FaHome,
      href: "/listings?type=house",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      name: "Commercials",
      icon: FaWarehouse,
      href: "/listings?type=commercial",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <section className="bg-orange-400 py-6 md:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Hero Content */}
        <div className="mb-8 hidden text-center md:mb-12 md:block lg:block">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-800 md:mb-6 md:text-5xl lg:text-6xl">
            Find Your Perfect{" "}
            <span className="relative text-orange-600">
              Rental Space

              <div className="absolute -bottom-2 left-0 right-0 h-1 scale-x-0 transform rounded-full bg-orange-300 animate-pulse" />
            </span>
          </h1>

          {/* Search Bar */}
          {/*
          <div className="mx-auto mb-8 max-w-2xl md:mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for rooms, hostels, flats..."
                className="w-full rounded-full border-2 border-gray-200 px-6 py-4 text-lg shadow-lg transition-all duration-200 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100"
              />

              <button className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-orange-600 p-3 text-white transition-all duration-200 hover:scale-105 hover:bg-orange-700">
                <FaSearch className="text-lg" />
              </button>
            </div>
          </div>
          */}
        </div>

        {/* Quick Navigation */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 hidden text-center text-xl font-semibold text-gray-800 md:mb-8 md:block md:text-2xl lg:block">
            Explore by Category
          </h2>

          <div className="grid grid-cols-3 gap-2 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
            {quickNavigation.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <Link
                  key={index}
                  href={item.href}
                  className="group mx-auto flex w-full max-w-[90px] transform flex-col items-center rounded-xl border border-gray-100 bg-white p-2 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl md:max-w-none md:rounded-2xl md:p-6"
                >
                  <div
                    className={`${item.color} mb-2 rounded-full p-2 text-white shadow-lg transition-all duration-300 group-hover:scale-110 md:mb-4 md:p-5`}
                  >
                    <IconComponent className="text-base md:text-2xl" />
                  </div>

                  <span className="text-xs font-semibold text-gray-700 transition-colors duration-300 group-hover:text-orange-600 md:text-base">
                    {item.name}
                  </span>

                  <div className="mt-2 h-0.5 w-0 rounded-full bg-orange-500 transition-all duration-300 group-hover:w-12" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        {/*
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-8">
          <div className="rounded-xl bg-white/60 p-4 text-center backdrop-blur-sm">
            <div className="mb-1 text-2xl font-bold text-orange-600 md:text-3xl">
              1000+
            </div>
            <div className="text-sm font-medium text-gray-600 md:text-base">
              Properties
            </div>
          </div>

          <div className="rounded-xl bg-white/60 p-4 text-center backdrop-blur-sm">
            <div className="mb-1 text-2xl font-bold text-orange-600 md:text-3xl">
              50+
            </div>
            <div className="text-sm font-medium text-gray-600 md:text-base">
              Cities
            </div>
          </div>

          <div className="rounded-xl bg-white/60 p-4 text-center backdrop-blur-sm">
            <div className="mb-1 text-2xl font-bold text-orange-600 md:text-3xl">
              500+
            </div>
            <div className="text-sm font-medium text-gray-600 md:text-base">
              Happy Users
            </div>
          </div>

          <div className="rounded-xl bg-white/60 p-4 text-center backdrop-blur-sm">
            <div className="mb-1 text-2xl font-bold text-orange-600 md:text-3xl">
              24/7
            </div>
            <div className="text-sm font-medium text-gray-600 md:text-base">
              Support
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
}