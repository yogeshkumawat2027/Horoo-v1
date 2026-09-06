export type ListingType = "flat" | "room" | "hostel" | "house" | "commercial";

export type ListingFilters = {
  page?: string;
  q?: string;
  state?: string;
  city?: string;
  area?: string;
  availableFor?: string;
  roomType?: string;
  flatType?: string;
  minPrice?: string;
  maxPrice?: string;
};

export type ListingQueryParams = Record<string, string | undefined>;

export type ApiListing = {
  _id: string;
  name?: string;
  title?: string;
  horooName?: string;
  type: ListingType;
  price?: number;
  rent?: number;
  ownerPrice?: number;
  horooPrice?: number;
  flatType?: string | null;
  roomType?: string | string[] | null;
  availableFor?: string[];
  images?: string[];
  state?: string | { name?: string };
  city?: string | { name?: string };
  area?: string | { name?: string };
  pincode?: string;
  isAvailable?: boolean;
  isVerified?: boolean;
  size?: string;
  description?: string;
  address?: string;
  facilities?: string[];
  owner?: {
    name?: string;
    mobile?: string;
  };
};

export type ListingsResponse = {
  success: boolean;
  listings: ApiListing[];
  pagination: {
    currentPage: number;
    totalListings: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  message?: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export function normalizeListingType(slug: string): ListingType | null {
  const normalized = slug.toLowerCase();
  const aliases: Record<string, ListingType> = {
    flat: "flat",
    flats: "flat",
    room: "room",
    rooms: "room",
    hostel: "hostel",
    hostels: "hostel",
    house: "house",
    houses: "house",
    commercial: "commercial",
    commercials: "commercial",
  };

  return aliases[normalized] || null;
}

export function getListingTypeLabel(type: ListingType) {
  const labels: Record<ListingType, string> = {
    flat: "Flats",
    room: "Rooms",
    hostel: "Hostels",
    house: "Houses",
    commercial: "Commercials",
  };

  return labels[type];
}

export async function getListings(
  type: ListingType,
  filters: ListingQueryParams
): Promise<ListingsResponse> {
  const params = new URLSearchParams({ type });

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/listing/user?${params.toString()}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Unable to load listings");
    }

    return response.json();
  } catch (error) {
    return {
      success: false,
      listings: [],
      pagination: {
        currentPage: Number(filters.page) || 1,
        totalListings: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      message:
        error instanceof Error ? error.message : "Unable to load listings",
    };
  }
}

export async function getListingById(
  listingId: string
): Promise<{ success: boolean; listing?: ApiListing; message?: string }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/listing/user/${encodeURIComponent(listingId)}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Listing not found");
    }

    return response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Listing not found",
    };
  }
}
