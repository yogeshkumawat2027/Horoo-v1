"use client";

import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaBed,
  FaRupeeSign,
  FaStar,
} from "react-icons/fa";

export interface Listing {
  _id: string;
  slug?: string;
  horooName: string;

  type: "flat" | "room" | "hostel" | "house" | "commercial";

  state?: {
    name: string;
  };

  city?: {
    name: string;
  };

  area?: {
    name: string;
  };

  pincode?: string;

  roomType?: string[];

  availableFor?: string[];

  ownerPrice?: number;

  horooPrice?: number;

  images: string[];

  averageRating?: number;

  totalRatings?: number;
}

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const {
    _id,
    slug,
    horooName,
    type,
    state,
    city,
    area,
    pincode,
    roomType = [],
    availableFor = [],
    ownerPrice,
    horooPrice,
    images = [],
    averageRating = 3.5,
  } = listing;

  // First image from images array
  const mainImage =
    images.length > 0
      ? images[0]
      : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5";

  // Location
  const line1Parts: string[] = [];
  const line2Parts: string[] = [];

  if (area?.name) line1Parts.push(area.name);
  if (city?.name) line1Parts.push(city.name);

  if (state?.name) line2Parts.push(state.name);
  if (pincode) line2Parts.push(pincode);

  const locationLine1 = line1Parts.join(", ");
  const locationLine2 = line2Parts.join(", ");

  // URL
  const urlSlug = slug || _id;

  const linkUrl =
    type === "room"
      ? `/rooms/${urlSlug}`
      : `/listings/${type}/${urlSlug}`;

  // Format type
  const formattedType =
    type.charAt(0).toUpperCase() + type.slice(1);

  // Price
  const displayPrice = ownerPrice || horooPrice;

  const hasDiscount =
    ownerPrice &&
    horooPrice &&
    horooPrice > ownerPrice;

  return (
    <Link href={linkUrl} className="block w-full">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-orange-200 cursor-pointer">

        {/* Image */}
        <div className="relative h-36 md:h-48 overflow-hidden">
          <img
            src={mainImage}
            alt={horooName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Listing Type */}
          <div className="absolute top-3 left-3">
            <span className="bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize shadow">
              {formattedType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 md:p-5">

          {/* Name + Rating */}
          <div className="flex items-start justify-between mb-1 md:mb-2">

            <h3 className="text-sm md:text-lg font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors flex-1">
              {horooName}
            </h3>

            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg ml-2">
              <FaStar className="text-yellow-500 text-xs" />

              <span className="text-xs font-bold text-gray-800">
                {averageRating?.toFixed(1) || "3.5"}
              </span>
            </div>

          </div>

          {/* Location */}
          {(locationLine1 || locationLine2) && (
            <div className="flex items-start gap-1 md:gap-2 mb-2 md:mb-3">

              <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0 text-xs md:text-sm" />

              <div className="text-xs md:text-sm text-gray-600 leading-relaxed">

                {locationLine1 && (
                  <div className="font-medium line-clamp-1">
                    {locationLine1}
                  </div>
                )}

                {locationLine2 && (
                  <div className="text-[10px] md:text-xs text-gray-500">
                    {locationLine2}
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Room Details */}
          <div className="space-y-1 md:space-y-2 mb-2 md:mb-4">

            {roomType.length > 0 && (
              <div className="flex items-center gap-2">

                <FaBed className="text-orange-500 text-xs" />

                <span className="text-xs font-medium text-gray-500">
                  Room Type:
                </span>

                <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
                  {roomType.join(", ")}
                </span>

              </div>
            )}

            {availableFor.length > 0 && (
              <div className="flex items-center gap-2">

                <FaUsers className="text-orange-500 text-xs" />

                <span className="text-xs font-medium text-gray-500">
                  Available:
                </span>

                <span className="text-xs text-gray-700 bg-green-100 px-2 py-1 rounded">
                  {availableFor.join(" • ")}
                </span>

              </div>
            )}

          </div>

          {/* Price */}
          <div className="mb-2 md:mb-4">

            <div className="flex items-center gap-3">

              {/* Old price */}
              {hasDiscount && (
                <div className="flex items-center text-gray-500">

                  <FaRupeeSign className="text-xs" />

                  <span className="text-sm line-through">
                    {horooPrice?.toLocaleString()}
                  </span>

                </div>
              )}

              {/* Current price */}
              <div className="flex items-center text-orange-600">

                <FaRupeeSign className="text-sm font-bold" />

                <span className="text-xl font-bold">
                  {displayPrice
                    ? displayPrice.toLocaleString()
                    : "Price on request"}
                </span>

                {displayPrice && (
                  <span className="text-sm text-gray-500 ml-1">
                    /month
                  </span>
                )}

              </div>

            </div>

            {/* Discount */}
            {hasDiscount && (
              <div className="mt-1">

                <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                  Save ₹
                  {(horooPrice! - ownerPrice!).toLocaleString()}
                </span>

              </div>
            )}

          </div>

        </div>
      </div>
    </Link>
  );
}