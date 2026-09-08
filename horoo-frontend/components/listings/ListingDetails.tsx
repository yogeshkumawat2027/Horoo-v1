import Link from "next/link";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Check,
  Home,
  MapPin,
  Phone,
  Ruler,
  Users,
} from "lucide-react";
import type { ApiListing } from "@/lib/listings";
import ListingGallery from "@/components/listings/ListingGallery";

type ListingDetailsProps = {
  listing: ApiListing;
};

export default function ListingDetails({ listing }: ListingDetailsProps) {
  const title = listing.name || "Rental listing";
  const price = listing.price?.toLocaleString();
  const location = [listing.area, listing.city, listing.state]
    .map(getLocationName)
    .filter(Boolean)
    .join(", ");
  const listingTypes = [listing.flatType, listing.roomType]
    .flatMap((value) => (Array.isArray(value) ? value : value ? [value] : []))
    .filter(Boolean);

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-3 py-3 sm:px-5 lg:px-6">
        <Link href={`/${listing.type}s`} className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-orange-600">
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
          <ListingGallery images={listing.images || []} title={title} />

          <section className="border border-gray-200 bg-white p-4 sm:p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-orange-600">
                  {listing.type}
                </p>
                <h1 className="text-2xl font-bold leading-tight text-gray-950">
                  {title}
                </h1>
              </div>
              <div className="shrink-0 text-right text-orange-600">
                <p className="text-xl font-bold">{price ? `Rs. ${price}` : "On request"}</p>
                {price && <p className="text-xs text-gray-500">per month</p>}
              </div>
            </div>

            {location && (
              <p className="mb-4 flex items-start gap-2 border-b border-gray-100 pb-4 text-sm text-gray-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <span>{location}{listing.pincode ? ` - ${listing.pincode}` : ""}</span>
              </p>
            )}

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              {listingTypes.length > 0 && <DetailItem icon={<BedDouble />} label={listingTypes.join(", ")} />}
              {listing.size && <DetailItem icon={<Ruler />} label={listing.size} />}
              {listing.availableFor && listing.availableFor.length > 0 && (
                <DetailItem icon={<Users />} label={listing.availableFor.join(", ")} />
              )}
              <DetailItem icon={<Home />} label={listing.isAvailable === false ? "Not available" : "Available"} />
            </div>
          </section>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
          <div className="space-y-4">
            {listing.description && (
              <section className="border border-gray-200 bg-white p-4 sm:p-5">
                <h2 className="mb-2 text-base font-bold text-gray-900">About this place</h2>
                <p className="whitespace-pre-line text-sm leading-6 text-gray-600">{listing.description}</p>
              </section>
            )}

            {listing.facilities && listing.facilities.length > 0 && (
              <section className="border border-gray-200 bg-white p-4 sm:p-5">
                <h2 className="mb-3 text-base font-bold text-gray-900">Facilities</h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {listing.facilities.map((facility) => (
                    <div key={facility} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {listing.address && (
              <section className="border border-gray-200 bg-white p-4 sm:p-5">
                <h2 className="mb-2 text-base font-bold text-gray-900">Address</h2>
                <p className="text-sm text-gray-600">{listing.address}</p>
              </section>
            )}
          </div>

          <aside className="h-fit border border-orange-100 bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-base font-bold text-gray-900">Owner</h2>
            <p className="text-lg font-semibold text-gray-900">{listing.owner?.name || "Owner"}</p>
            {listing.owner?.mobile && (
              <a href={`tel:${listing.owner.mobile}`} className="mt-3 flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700">
                <Phone className="h-4 w-4" />
                <span>Call {listing.owner.mobile}</span>
              </a>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

function DetailItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded border border-gray-100 px-2 py-2">
      <span className="text-orange-500 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      <span className="truncate capitalize">{label}</span>
    </div>
  );
}

function getLocationName(value?: string | { name?: string }) {
  return typeof value === "string" ? value : value?.name || "";
}