"use client";

import Link from "next/link";
import type { ApiListing } from "@/lib/listings";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaBed,
  FaRupeeSign,
  FaStar,
} from "react-icons/fa";

type LocationValue = string | { name?: string };

export interface Listing extends ApiListing {
  slug?: string;
  averageRating?: number;
  totalRatings?: number;
  state?: LocationValue;
  city?: LocationValue;
  area?: LocationValue;
}

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const {
    _id,
    slug,
    horooName,
    name,
    title,
    type,
    state,
    city,
    area,
    pincode,
    roomType,
    flatType,
    availableFor = [],
    ownerPrice,
    horooPrice,
    price,
    rent,
    images = [],
    averageRating = 3.5,
  } = listing;

  const mainImage =
    images.length > 0
      ? images[0]
      : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5";
  const displayName = horooName || name || title || "Rental listing";
  const displayTypes = Array.isArray(roomType)
    ? roomType
    : roomType
    ? [roomType]
    : flatType
    ? [flatType]
    : [];

  const line1Parts = [getLocationName(area), getLocationName(city)].filter(
    Boolean
  );
  const line2Parts = [getLocationName(state), pincode].filter(Boolean);
  const locationLine1 = line1Parts.join(", ");
  const locationLine2 = line2Parts.join(", ");
  const urlSlug = slug || _id;
  const linkUrl = `/${type}/${urlSlug}`;
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
  const displayPrice = ownerPrice || price || rent || horooPrice;
  const hasDiscount = Boolean(ownerPrice && horooPrice && horooPrice > ownerPrice);

  return (
    <Link href={linkUrl} className="block w-full">
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-all duration-300 hover:border-orange-200 hover:shadow-xl">
        <div className="relative h-40 overflow-hidden md:h-48">
          <img
            src={mainImage}
            alt={displayName}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold capitalize text-white shadow">
              {formattedType}
            </span>
          </div>
        </div>

        <div className="p-3 md:p-5">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="flex-1 truncate text-sm font-bold text-gray-800 transition-colors group-hover:text-orange-600 md:text-lg">
              {displayName}
            </h3>

            <div className="ml-2 flex items-center gap-1 rounded-lg bg-yellow-50 px-2 py-1">
              <FaStar className="text-xs text-yellow-500" />
              <span className="text-xs font-bold text-gray-800">
                {averageRating.toFixed(1)}
              </span>
            </div>
          </div>

          {(locationLine1 || locationLine2) && (
            <div className="mb-3 flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-xs text-orange-500 md:text-sm" />
              <div className="min-w-0 text-xs leading-relaxed text-gray-600 md:text-sm">
                {locationLine1 && (
                  <div className="truncate font-medium">{locationLine1}</div>
                )}
                {locationLine2 && (
                  <div className="truncate text-[10px] text-gray-500 md:text-xs">
                    {locationLine2}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mb-4 space-y-2">
            {displayTypes.length > 0 && (
              <div className="flex items-center gap-2">
                <FaBed className="text-xs text-orange-500" />
                <span className="text-xs font-medium text-gray-500">Type:</span>
                <span className="truncate rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                  {displayTypes.join(", ")}
                </span>
              </div>
            )}

            {availableFor.length > 0 && (
              <div className="flex items-center gap-2">
                <FaUsers className="text-xs text-orange-500" />
                <span className="text-xs font-medium text-gray-500">
                  Available:
                </span>
                <span className="truncate rounded bg-green-100 px-2 py-1 text-xs text-gray-700">
                  {availableFor.join(" • ")}
                </span>
              </div>
            )}
          </div>

          <div className="mb-2">
            <div className="flex items-center gap-3">
              {hasDiscount && (
                <div className="flex items-center text-gray-500">
                  <FaRupeeSign className="text-xs" />
                  <span className="text-sm line-through">
                    {horooPrice?.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex items-center text-orange-600">
                <FaRupeeSign className="text-sm font-bold" />
                <span className="text-xl font-bold">
                  {displayPrice
                    ? displayPrice.toLocaleString()
                    : "Price on request"}
                </span>
                {displayPrice && (
                  <span className="ml-1 text-sm text-gray-500">/month</span>
                )}
              </div>
            </div>

            {hasDiscount && (
              <div className="mt-1">
                <span className="inline-block rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Save Rs. {(horooPrice! - ownerPrice!).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function getLocationName(location?: LocationValue) {
  if (!location) return "";
  if (typeof location === "string") return location;
  return location.name || "";
}
