import Link from "next/link";
import { Building2, Plus } from "lucide-react";

export default function OwnerDashboardPage() {
  return (
    <main className="bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="border border-gray-200 bg-white p-6 shadow-sm">
          <Building2 className="h-8 w-8 text-orange-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-950">
            Owner Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Your owner area is ready for listing management. Connect this page
            to the owner listing APIs when create/edit screens are added.
          </p>
          <Link
            href="/list-rental"
            className="mt-5 inline-flex items-center gap-2 bg-orange-600 px-5 py-3 text-sm font-bold text-white hover:bg-orange-700"
          >
            <Plus className="h-4 w-4" />
            Add Rental
          </Link>
        </div>
      </section>
    </main>
  );
}
