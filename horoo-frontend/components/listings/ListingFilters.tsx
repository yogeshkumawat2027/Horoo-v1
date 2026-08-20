"use client";

import { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { ListingType } from "@/lib/listings";

type ListingFiltersProps = {
  listingType: ListingType;
};

const availableForOptions = ["boys", "girls", "family", "anyone"];
const roomTypeOptions = ["single", "double-sharing", "triple-sharing", "dormitory"];
const flatTypeOptions = ["1BHK", "2BHK", "3BHK", "4BHK"];

export default function ListingFilters({ listingType }: ListingFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      const fieldValue = String(value).trim();
      if (fieldValue) params.set(key, fieldValue);
    });

    router.push(`?${params.toString()}`);
  }

  return (
    <form
      onSubmit={applyFilters}
      className="border border-gray-200 bg-white p-4 shadow-sm md:p-5"
    >
      <div className="mb-4 flex items-center gap-2 text-gray-900">
        <SlidersHorizontal className="h-5 w-5 text-orange-600" />
        <h2 className="text-base font-bold">Filters</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-1 text-sm font-semibold text-gray-700">
          Search
          <div className="flex items-center gap-2 border border-gray-200 px-3 py-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              name="q"
              defaultValue={searchParams.get("q") || ""}
              placeholder="Area, city, name"
              className="w-full outline-none"
            />
          </div>
        </label>

        <FilterInput name="city" label="City" value={searchParams.get("city")} />
        <FilterInput name="area" label="Area" value={searchParams.get("area")} />
        <FilterInput name="state" label="State" value={searchParams.get("state")} />

        <FilterInput
          name="minPrice"
          label="Min Price"
          type="number"
          value={searchParams.get("minPrice")}
        />
        <FilterInput
          name="maxPrice"
          label="Max Price"
          type="number"
          value={searchParams.get("maxPrice")}
        />

        <FilterSelect
          name="availableFor"
          label="Available For"
          value={searchParams.get("availableFor")}
          options={availableForOptions}
        />

        {listingType === "room" && (
          <FilterSelect
            name="roomType"
            label="Room Type"
            value={searchParams.get("roomType")}
            options={roomTypeOptions}
          />
        )}

        {listingType === "flat" && (
          <FilterSelect
            name="flatType"
            label="Flat Type"
            value={searchParams.get("flatType")}
            options={flatTypeOptions}
          />
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button className="bg-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-700">
          Apply
        </button>

        <button
          type="button"
          onClick={() => router.push("?")}
          className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 hover:border-orange-200 hover:text-orange-600"
        >
          <X className="h-4 w-4" />
          Clear
        </button>
      </div>
    </form>
  );
}

function FilterInput({
  name,
  label,
  value,
  type = "text",
}: {
  name: string;
  label: string;
  value: string | null;
  type?: string;
}) {
  return (
    <label className="space-y-1 text-sm font-semibold text-gray-700">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={value || ""}
        className="w-full border border-gray-200 px-3 py-2 outline-none focus:border-orange-500"
      />
    </label>
  );
}

function FilterSelect({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value: string | null;
  options: string[];
}) {
  return (
    <label className="space-y-1 text-sm font-semibold text-gray-700">
      {label}
      <select
        name={name}
        defaultValue={value || ""}
        className="w-full border border-gray-200 bg-white px-3 py-2 capitalize outline-none focus:border-orange-500"
      >
        <option value="">Any</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replace("-", " ")}
          </option>
        ))}
      </select>
    </label>
  );
}
