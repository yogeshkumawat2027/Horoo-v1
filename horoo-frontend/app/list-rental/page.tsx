import OwnerBenefits from "@/components/list-rental/OwnerBenefits";
import HelpSupport from "@/components/list-rental/HelpSupport";
import ListRentalGate from "@/components/list-rental/ListRentalGate";

export default function ListRentalPage() {
  return (
    <main className="bg-gray-50">
      <section className="border-b border-orange-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
              List with Horoo
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-950 md:text-4xl">
              List your rental property as an owner
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Add rooms, flats, hostels, houses or commercial spaces and manage
              enquiries from one owner account.
            </p>
          </div>
          <ListRentalGate />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <OwnerBenefits />
        <HelpSupport />
      </section>
    </main>
  );
}
