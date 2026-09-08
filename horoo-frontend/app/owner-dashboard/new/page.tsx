import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import OwnerListingForm from "@/components/owner/OwnerListingForm";

export default function NewOwnerListingPage() {
  return <main className="min-h-screen bg-gray-50 px-4 py-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><Link href="/owner-dashboard" className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600"><ArrowLeft className="h-4 w-4" />Dashboard</Link><h1 className="mb-3 text-xl font-bold text-gray-950">Add listing</h1><OwnerListingForm /></div></main>;
}