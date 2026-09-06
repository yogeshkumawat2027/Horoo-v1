"use client";

import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { getOwnerListing } from "@/lib/ownerListings";
import type { ApiListing } from "@/lib/listings";

export default function OwnerListingPage({ params }: { params: Promise<{ id: string }> }) {
  const [listing, setListing] = useState<ApiListing | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { params.then(({ id }) => getOwnerListing(id).then((result) => setListing(result.listing)).catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Listing not found"))); }, [params]);
  if (error) return <main className="mx-auto max-w-4xl px-4 py-10 text-sm text-red-700">{error}</main>;
  if (!listing) return <main className="mx-auto max-w-4xl px-4 py-10 text-sm text-gray-600">Loading listing...</main>;
  return <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl"><div className="mb-5 flex items-center justify-between"><Link href="/owner-dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600"><ArrowLeft className="h-4 w-4" />Dashboard</Link><Link href={`/owner-dashboard/${listing._id}/edit`} className="inline-flex items-center gap-2 bg-orange-600 px-4 py-2 text-sm font-bold text-white"><Pencil className="h-4 w-4" />Edit</Link></div><div className="border border-gray-200 bg-white p-4 sm:p-6"><h1 className="text-2xl font-bold text-gray-950">{listing.name || listing.title}</h1><p className="mt-2 text-sm text-gray-600">{listing.address}, {listing.city}, {listing.state}</p><p className="mt-4 text-xl font-bold text-orange-600">₹{listing.price ?? listing.rent ?? "-"}</p><div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5">{listing.images?.map((image, index) => <img key={`${image}-${index}`} src={image} alt={`Listing ${index + 1}`} className="aspect-square w-full object-cover" />)}</div><p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-gray-700">{listing.description || "No description added."}</p></div></div></main>;
}