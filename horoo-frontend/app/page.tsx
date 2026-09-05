
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";
import ListingCard from "@/components/ListingCard";
import { getListings } from "@/lib/listings";

export default async function Home() {
  const data = await getListings("room", { page: "1" });

  return (
    <>
      <Hero />
     
      <Footer />
    </>
  );
}
