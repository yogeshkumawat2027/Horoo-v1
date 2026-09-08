"use client";

import { FormEvent, useState } from "react";
import { ImagePlus, LoaderCircle, MapPin, Trash2 } from "lucide-react";
import type { ApiListing, ListingType } from "@/lib/listings";
import { createOwnerListing, updateOwnerListing, uploadListingImages, type ListingInput } from "@/lib/ownerListings";

const types: ListingType[] = ["flat", "room", "hostel", "house", "commercial"];
const audiences = ["boys", "girls", "family", "anyone"];
const flatTypes = ["1BHK", "2BHK", "3BHK", "4BHK"];
const roomTypes = ["single", "double-sharing", "triple-sharing"];
const hostelTypes = ["single", "double-sharing", "triple-sharing", "dormitory"];

const typeLabels: Record<ListingType, string> = {
  flat: "Flat",
  room: "Room",
  hostel: "Hostel",
  house: "House",
  commercial: "Commercial",
};

function getSubtypeConfig(type: ListingType) {
  if (type === "flat" || type === "house") {
    return { name: "flatType", label: type === "house" ? "House configuration" : "Flat configuration", options: flatTypes, placeholder: "Select BHK" };
  }
  if (type === "hostel") {
    return { name: "roomType", label: "Hostel room type", options: hostelTypes, placeholder: "Select room type" };
  }
  if (type === "room") {
    return { name: "roomType", label: "Room sharing", options: roomTypes, placeholder: "Select sharing type" };
  }
  return null;
}

function getSubtypeValue(listing: ApiListing | undefined, field: string) {
  const value = field === "flatType" ? listing?.flatType : listing?.roomType;
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function formatSubtype(value: string) {
  return value.replace("-", " ").replace(/^./, (character) => character.toUpperCase());
}

export default function OwnerListingForm({ listing }: { listing?: ApiListing }) {
  const [images, setImages] = useState<string[]>(listing?.images || []);
  const [propertyType, setPropertyType] = useState<ListingType>(listing?.type || "flat");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleImages(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError("");
    try {
      const uploaded = await uploadListingImages(Array.from(files));
      setImages((current) => [...current, ...uploaded]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSaving(true);
    setError("");
    setMessage("");
    const data = new FormData(event.currentTarget);
    const coordinates = [Number(data.get("longitude") || 0), Number(data.get("latitude") || 0)] as [number, number];
    const input: ListingInput = {
      name: String(data.get("name") || "").trim(),
      type: String(data.get("type") || "flat") as ListingType,
      price: Number(data.get("price") || 0),
      flatType: propertyType === "flat" || propertyType === "house" ? String(data.get("flatType") || "") || null : null,
      roomType: propertyType === "room" || propertyType === "hostel" ? String(data.get("roomType") || "") || null : null,
      availableFor: data.getAll("availableFor").map(String),
      size: String(data.get("size") || "").trim(),
      description: String(data.get("description") || "").trim(),
      address: String(data.get("address") || "").trim(),
      state: String(data.get("state") || "").trim(),
      city: String(data.get("city") || "").trim(),
      area: String(data.get("area") || "").trim(),
      pincode: String(data.get("pincode") || "").trim(),
      facilities: String(data.get("facilities") || "").split(",").map((value) => value.trim()).filter(Boolean),
      images,
      location: { type: "Point", coordinates },
    };
    try {
      await (listing ? updateOwnerListing(listing._id, input) : createOwnerListing(input));
      setMessage(listing ? "Listing updated." : "Listing created.");
      if (!listing) form.reset();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save listing");
    } finally {
      setSaving(false);
    }
  }

  const coordinates = listing?.location?.coordinates || [0, 0];
  return (
    <form onSubmit={handleSubmit} className="overflow-hidden border border-stone-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="divide-y divide-stone-200">
          <FormSection number="01" title="Listing basics">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field name="name" label="Listing name" defaultValue={listing?.name} required className="sm:col-span-2" />
              <SelectField name="type" label="Property type" value={propertyType} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setPropertyType(event.target.value as ListingType)}>{types.map((type) => <option key={type} value={type}>{typeLabels[type]}</option>)}</SelectField>
              <Field name="price" label="Monthly rent (Rs.)" type="number" min="0" defaultValue={listing?.price}  required />
              <Field name="size" label="Size" defaultValue={listing?.size} placeholder="e.g. 1200 sq ft" />
              {getSubtypeConfig(propertyType) && (() => {
                const subtype = getSubtypeConfig(propertyType)!;
                return <SelectField name={subtype.name} label={subtype.label} defaultValue={getSubtypeValue(listing, subtype.name)} required>
                  <option value="">{subtype.placeholder}</option>
                  {subtype.options.map((option) => <option key={option} value={option}>{formatSubtype(option)}</option>)}
                </SelectField>;
              })()}
            </div>
          </FormSection>

          <FormSection number="02" title="Location">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field name="state" label="State" defaultValue={getText(listing?.state)} required />
              <Field name="city" label="City" defaultValue={getText(listing?.city)} required />
              <Field name="area" label="Area / neighbourhood" defaultValue={getText(listing?.area)} />
              <Field name="pincode" label="Pincode" defaultValue={listing?.pincode} />
              <Field name="address" label="Full address" defaultValue={listing?.address} required className="sm:col-span-2" />
            </div>
            <details className="mt-5 border-t border-dashed border-stone-200 pt-4">
              <summary className="flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-wide text-stone-500"><MapPin className="h-3.5 w-3.5" /> Map coordinates</summary>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Field name="longitude" label="Longitude" type="number" step="any" defaultValue={coordinates[0]} required />
                <Field name="latitude" label="Latitude" type="number" step="any" defaultValue={coordinates[1]} required />
              </div>
            </details>
          </FormSection>

          <FormSection number="03" title="Details">
            <label className="block text-xs font-bold uppercase tracking-wide text-stone-600">Description<textarea name="description" defaultValue={listing?.description} rows={5} placeholder="What makes this place a good choice?" className="input-style mt-2 min-h-32 resize-y" /></label>
            <label className="mt-3 block text-xs font-bold uppercase tracking-wide text-stone-600">Facilities<input name="facilities" defaultValue={listing?.facilities?.join(", ")} placeholder="Parking, Wi-Fi, Lift" className="input-style mt-2" /></label>
            <fieldset className="mt-4"><legend className="text-xs font-bold uppercase tracking-wide text-stone-600">Suitable for</legend><div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">{audiences.map((audience) => <label key={audience} className="flex cursor-pointer items-center gap-2 border border-stone-200 px-3 py-2 text-sm capitalize transition has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50"><input type="checkbox" name="availableFor" value={audience} defaultChecked={listing?.availableFor?.includes(audience)} className="accent-orange-600" />{audience}</label>)}</div></fieldset>
          </FormSection>
        </div>

        <aside className="border-t border-stone-200 bg-stone-50 p-4 lg:border-l lg:border-t-0">
          <div className="sticky top-4">
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-stone-500">Gallery</p><h2 className="mt-1 text-lg font-bold text-stone-950">Show your space</h2></div><span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-stone-500">{images.length} added</span></div>
            <label className="mt-4 flex min-h-24 cursor-pointer flex-col items-center justify-center border border-dashed border-orange-300 bg-orange-50 px-3 py-3 text-center transition hover:bg-orange-100"><ImagePlus className="h-5 w-5 text-orange-600" /><span className="mt-1 text-sm font-bold text-orange-700">{uploading ? "Uploading..." : "Add photos"}</span><input type="file" accept="image/*" multiple className="hidden" onChange={(event) => handleImages(event.target.files)} disabled={uploading} /></label>
            {images.length > 0 && <div className="mt-3 grid grid-cols-3 gap-1.5">{images.map((image, index) => <div key={`${image}-${index}`} className="group relative aspect-square overflow-hidden bg-stone-200"><img src={image} alt={`Listing ${index + 1}`} className="h-full w-full object-cover" /><button type="button" onClick={() => setImages((current) => current.filter((_, imageIndex) => imageIndex !== index))} className="absolute right-1.5 top-1.5 bg-white/95 p-1.5 text-red-600 opacity-0 shadow-sm transition group-hover:opacity-100 focus:opacity-100" aria-label="Remove image"><Trash2 className="h-3.5 w-3.5" /></button>{index === 0 && <span className="absolute bottom-1 left-1 bg-stone-950/75 px-1.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Cover</span>}</div>)}</div>}
          </div>
        </aside>
      </div>
      <div className="border-t border-stone-200 bg-white px-5 py-3 sm:px-7"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">{error ? <p className="border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : message ? <p className="border border-green-100 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{message}</p> : null}<button type="submit" disabled={saving || uploading} className="inline-flex items-center justify-center gap-2 bg-orange-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60">{saving && <LoaderCircle className="h-4 w-4 animate-spin" />}{saving ? "Saving..." : listing ? "Save changes" : "Publish listing"}</button></div></div>
    </form>
  );
}

function FormSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <section className="p-4 sm:p-5"><div className="mb-3 flex items-center gap-3"><span className="text-xs font-bold tracking-widest text-orange-600">{number}</span><h2 className="text-base font-bold text-stone-950">{title}</h2></div>{children}</section>;
}

function Field({ name, label, prefix, className = "", ...props }: { name: string; label: string; prefix?: string; className?: string; [key: string]: unknown }) {
  return <label className={`block text-xs font-bold uppercase tracking-wide text-stone-600 ${className}`}>{label}<span className="relative mt-1.5 block">{prefix && <span className="pointer-events-none absolute inset-y-0 left-0 flex w-14 items-center justify-center border-r border-stone-200 pr-1 text-xs font-bold text-stone-500">{prefix}</span>}<input name={name} className={`input-style ${prefix ? "pl-16" : ""}`} {...props} /></span></label>;
}

function SelectField({ name, label, children, ...props }: { name: string; label: string; children: React.ReactNode; [key: string]: unknown }) {
  return <label className="block text-xs font-bold uppercase tracking-wide text-stone-600">{label}<select name={name} className="input-style mt-2 capitalize" {...props}>{children}</select></label>;
}

function getText(value?: string | { name?: string }) { return typeof value === "string" ? value : value?.name || ""; }