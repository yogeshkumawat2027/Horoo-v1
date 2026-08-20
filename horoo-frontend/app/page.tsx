
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";
import { dummyListings } from "./data/dummyListings";
import ListingCard from "@/components/ListingCard";

export default function Home() {
  return (
   <>
   <Hero />
    <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Latest Listings
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {dummyListings.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
            />
          ))}
        </div>
      </section>
   <Footer />
   </>
  );
}
