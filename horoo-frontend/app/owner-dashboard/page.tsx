"use client";

import Link from "next/link";
import { Building2, LoaderCircle, Plus, Pencil, MapPin, ArrowUpRight } from "lucide-react";
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
    <main className="min-h-screen bg-stone-50">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 border-b border-stone-200 pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Owner dashboard</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-950">Welcome{user?.name ? `, ${user.name}` : ""}</h1>
            <p className="mt-1 text-sm text-stone-600">Manage your rental listings.</p>
          </div>
          <Link href="/owner-dashboard/new" className="inline-flex w-fit items-center gap-2 rounded-sm bg-orange-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-orange-700">
            <Plus className="h-4 w-4" /> Add listing
          </Link>
        </div>

        {loading && <div className="flex items-center gap-2 py-10 text-sm text-gray-600"><LoaderCircle className="h-4 w-4 animate-spin" />Loading listings...</div>}
        {error && <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
        {!loading && !error && listings.length === 0 && (
            <div className="border border-dashed border-stone-300 bg-white px-6 py-12 text-center">
            <Building2 className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-3 font-semibold text-gray-900">No listings yet</p>
            <p className="mt-1 text-sm text-gray-600">Add your first rental to see it here.</p>
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => <OwnerListingCard key={listing._id} listing={listing} />)}
        </div>
      </section>
    </main>
  );
}

function OwnerListingCard({ listing }: { listing: ApiListing }) {
  const image = listing.images?.[0];
  return (
    <article className="group relative overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg">
      <Link href={`/owner-dashboard/${listing._id}`} className="block">
        <div className="relative h-48 overflow-hidden bg-stone-100">
          {image ? <img src={image} alt={listing.name || "Listing"} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" /> : <Building2 className="mx-auto mt-16 h-9 w-9 text-stone-300" />}
          <span className="absolute left-3 top-3 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold capitalize text-white shadow">{listing.type || "Rental"}</span>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h2 className="line-clamp-1 text-lg font-bold text-stone-900 transition-colors group-hover:text-orange-600">{listing.name || listing.title || "Untitled listing"}</h2>
            <span className="shrink-0 text-base font-bold text-orange-600">Rs. {listing.price ?? listing.rent ?? "-"}</span>
          </div>
          <p className="mt-2 flex items-center gap-1 text-sm text-stone-600"><MapPin className="h-3.5 w-3.5 shrink-0 text-orange-500" />{listing.city || listing.state || listing.address || "Location not added"}</p>
          <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-xs font-semibold uppercase tracking-wide text-stone-400"><span>{listing.type || "Rental"}</span><span className="text-orange-600">View details <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></span></div>
        </div>
      </Link>
      <div className="absolute right-3 top-3">
        <Link href={`/owner-dashboard/${listing._id}/edit`} className="inline-flex rounded-full bg-white/95 p-2 text-stone-500 shadow hover:text-orange-600" aria-label="Edit listing"><Pencil className="h-4 w-4" /></Link>
      </div>
    </article>
  );
}
