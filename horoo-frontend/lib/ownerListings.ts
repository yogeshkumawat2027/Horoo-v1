import type { ApiListing, ListingType } from "@/lib/listings";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type ListingInput = {
  name: string;
  type: ListingType;
  price: number;
  flatType?: string | null;
  roomType?: string | null;
  availableFor: string[];
  size: string;
  description: string;
  address: string;
  state: string;
  city: string;
  area: string;
  pincode: string;
  facilities: string[];
  images: string[];
  location: { type: "Point"; coordinates: [number, number] };
};

async function ownerRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || "Unable to complete listing request");
  return data as T;
}

export function getOwnerListings() {
  return ownerRequest<{ success: boolean; listings: ApiListing[] }>("/api/listing/owner/my-listings");
}

export function getOwnerListing(id: string) {
  return ownerRequest<{ success: boolean; listing: ApiListing }>(`/api/listing/owner/my-listings/${encodeURIComponent(id)}`);
}

export function createOwnerListing(input: ListingInput) {
  return ownerRequest<{ success: boolean; listing: ApiListing }>("/api/listing/owner/create", { method: "POST", body: JSON.stringify(input) });
}

export function updateOwnerListing(id: string, input: ListingInput) {
  return ownerRequest<{ success: boolean; listing: ApiListing }>(`/api/listing/owner/edit/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(input) });
}

export async function uploadListingImage(file: File) {
  const signature = await ownerRequest<{ cloudName: string; apiKey: string; timestamp: number; folder: string; signature: string }>("/api/upload/signature");
  const body = new FormData();
  body.append("file", file);
  body.append("api_key", signature.apiKey);
  body.append("timestamp", String(signature.timestamp));
  body.append("folder", signature.folder);
  body.append("signature", signature.signature);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, { method: "POST", body });
  const data = await response.json();
  if (!response.ok || !data.secure_url) throw new Error(data.error?.message || "Image upload failed");
  return data.secure_url as string;
}