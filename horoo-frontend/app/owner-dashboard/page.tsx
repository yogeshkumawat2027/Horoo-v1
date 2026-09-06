"use client";

import Link from "next/link";
import { Building2, LoaderCircle, Plus, Pencil, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getStoredUser, type AuthUser } from "@/lib/auth";
import { getOwnerListings } from "@/lib/ownerListings";
import type { ApiListing } from "@/lib/listings";

export default function OwnerDashboardPage() {
  const [user] = useState<AuthUser | null>(() => getStoredUser());
  const [listings, setListings] = useState<ApiListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getOwnerListings()
      .then((result) => setListings(Array.isArray(result.listings) ? result.listings : []))
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Unable to load listings"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">Owner dashboard</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-950">Welcome{user?.name ? `, ${user.name}` : ""}</h1>
            <p className="mt-1 text-sm text-gray-600">Manage your rental listings.</p>
          </div>
          <Link href="/owner-dashboard/new" className="inline-flex w-fit items-center gap-2 bg-orange-600 px-4 py-3 text-sm font-bold text-white hover:bg-orange-700">
            <Plus className="h-4 w-4" /> Add listing
          </Link>
        </div>

        {loading && <div className="flex items-center gap-2 py-10 text-sm text-gray-600"><LoaderCircle className="h-4 w-4 animate-spin" />Loading listings...</div>}
        {error && <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
        {!loading && !error && listings.length === 0 && (
          <div className="border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <Building2 className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-3 font-semibold text-gray-900">No listings yet</p>
            <p className="mt-1 text-sm text-gray-600">Add your first rental to see it here.</p>
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => <OwnerListingCard key={listing._id} listing={listing} />)}
        </div>
      </section>
    </main>
  );
}

function OwnerListingCard({ listing }: { listing: ApiListing }) {
  const image = listing.images?.[0];
  return (
    <article className="overflow-hidden border border-gray-200 bg-white">
      <Link href={`/owner-dashboard/${listing._id}`} className="block">
        <div className="aspect-[4/3] bg-gray-100">
          {image ? <img src={image} alt={listing.name || "Listing"} className="h-full w-full object-cover" /> : <Building2 className="mx-auto mt-16 h-10 w-10 text-gray-300" />}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-bold text-gray-950">{listing.name || listing.title || "Untitled listing"}</h2>
            <span className="shrink-0 text-sm font-bold text-orange-600">₹{listing.price ?? listing.rent ?? "-"}</span>
          </div>
          <p className="mt-2 flex items-center gap-1 text-sm text-gray-600"><MapPin className="h-4 w-4" />{listing.city || listing.state || listing.address || "Location not added"}</p>
        </div>
      </Link>
      <div className="border-t border-gray-100 px-4 py-3">
        <Link href={`/owner-dashboard/${listing._id}/edit`} className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-orange-600"><Pencil className="h-4 w-4" />Edit listing</Link>
      </div>
    </article>
  );
}
