import { Mail, Phone } from "lucide-react";

export default function HelpSupport() {
  return (
    <div className="border border-orange-100 bg-orange-50 p-5">
      <h2 className="text-lg font-bold text-gray-950">Help and support</h2>
      <p className="mt-2 text-sm leading-6 text-gray-700">
        Need help creating a listing or choosing the right owner account? Reach
        the Horoo team and we will guide you through it.
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-gray-800">
        <a
          href="tel:+910000000000"
          className="inline-flex items-center gap-2 border border-orange-200 bg-white px-3 py-2 hover:text-orange-600"
        >
          <Phone className="h-4 w-4" />
          Call support
        </a>
        <a
          href="mailto:support@horoo.in"
          className="inline-flex items-center gap-2 border border-orange-200 bg-white px-3 py-2 hover:text-orange-600"
        >
          <Mail className="h-4 w-4" />
          Email support
        </a>
      </div>
    </div>
  );
}
