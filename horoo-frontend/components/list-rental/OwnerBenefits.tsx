import { BadgeCheck, Headphones, IndianRupee, ShieldCheck } from "lucide-react";

const benefits = [
  {
    title: "Verified owner profile",
    description: "Build trust with tenants before the first call.",
    icon: ShieldCheck,
  },
  {
    title: "Better rental reach",
    description: "Put your property in front of people already searching.",
    icon: BadgeCheck,
  },
  {
    title: "Simple price visibility",
    description: "Show monthly rent, location and sharing details clearly.",
    icon: IndianRupee,
  },
  {
    title: "Help and support",
    description: "Get assistance while listing or managing your property.",
    icon: Headphones,
  },
];

export default function OwnerBenefits() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {benefits.map((benefit) => {
        const Icon = benefit.icon;

        return (
          <div key={benefit.title} className="border border-gray-200 bg-white p-4">
            <Icon className="mb-3 h-5 w-5 text-orange-600" />
            <h3 className="text-base font-bold text-gray-900">
              {benefit.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {benefit.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
