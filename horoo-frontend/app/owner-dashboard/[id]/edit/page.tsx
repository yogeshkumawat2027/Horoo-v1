"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import OwnerListingForm from "@/components/owner/OwnerListingForm";
import { getOwnerListing } from "@/lib/ownerListings";
import type { ApiListing } from "@/lib/listings";

export default function EditOwnerListingPage({ params }: { params: Promise<{ id: string }> }) {
  const [listing, setListing] = useState<ApiListing>();
  const [error, setError] = useState("");
  useEffect(() => { params.then(({ id }) => getOwnerListing(id).then((result) => setListing(result.listing)).catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Listing not found"))); }, [params]);
  return <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl"><Link href="/owner-dashboard" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600"><ArrowLeft className="h-4 w-4" />Dashboard</Link><h1 className="mb-5 text-2xl font-bold text-gray-950">Edit listing</h1>{error ? <p className="text-sm text-red-700">{error}</p> : listing ? <OwnerListingForm listing={listing} /> : <p className="text-sm text-gray-600">Loading listing...</p>}</div></main>;
}