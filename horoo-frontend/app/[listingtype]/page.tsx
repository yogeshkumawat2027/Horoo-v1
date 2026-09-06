import { notFound } from "next/navigation";
import ListingCard from "@/components/ListingCard";
import ListingFilters from "@/components/listings/ListingFilters";
import Pagination from "@/components/listings/Pagination";
import {
  getListingTypeLabel,
  getListingById,
  getListings,
  normalizeListingType,
  type ListingFilters as ListingFiltersType,
} from "@/lib/listings";
import ListingDetails from "@/components/listings/ListingDetails";

export default async function ListingTypePage({
  params,
  searchParams,
}: PageProps<"/[listingtype]">) {
  const { listingtype } = await params;
  const filters = (await searchParams) as ListingFiltersType;
  const listingType = normalizeListingType(listingtype);

  if (!listingType) {
    const result = await getListingById(listingtype);

    if (!result.success || !result.listing) notFound();

    return <ListingDetails listing={result.listing} />;
  }

  const data = await getListings(listingType, filters);
  const label = getListingTypeLabel(listingType);

  return (
    <main className="bg-gray-50">
      <section className="border-b border-orange-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
         
          <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-950 md:text-4xl">
                {label} for rent
              </h1>
            </div>
            {/* <div className="text-sm font-semibold text-gray-600">
              {data.pagination.totalListings} listings found
            </div> */}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ListingFilters listingType={listingType} />

        {!data.success && (
          <div className="mt-5 border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {data.message || "Unable to load listings right now."}
          </div>
        )}

        {data.listings.length > 0 ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>

            <Pagination
              currentPage={data.pagination.currentPage}
              totalPages={data.pagination.totalPages}
              searchParams={filters}
            />
          </>
        ) : (
          <div className="mt-6 border border-gray-200 bg-white px-6 py-12 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              No listings found
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Try changing the city, area, budget or sharing filters.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
