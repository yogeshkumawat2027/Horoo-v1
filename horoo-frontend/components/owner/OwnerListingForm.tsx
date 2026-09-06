"use client";

import { FormEvent, useState } from "react";
import { Check, ImagePlus, LoaderCircle, MapPin, Trash2 } from "lucide-react";
import type { ApiListing, ListingType } from "@/lib/listings";
import { createOwnerListing, updateOwnerListing, uploadListingImage, type ListingInput } from "@/lib/ownerListings";

const types: ListingType[] = ["flat", "room", "hostel", "house", "commercial"];
const audiences = ["boys", "girls", "family", "anyone"];

export default function OwnerListingForm({ listing }: { listing?: ApiListing }) {
  const [images, setImages] = useState<string[]>(listing?.images || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleImages(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError("");
    try {
      const uploaded = await Promise.all(Array.from(files).map(uploadListingImage));
      setImages((current) => [...current, ...uploaded]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    const data = new FormData(event.currentTarget);
    const coordinates = [Number(data.get("longitude") || 0), Number(data.get("latitude") || 0)] as [number, number];
    const input: ListingInput = {
      name: String(data.get("name") || "").trim(),
      type: String(data.get("type") || "flat") as ListingType,
      price: Number(data.get("price") || 0),
      flatType: String(data.get("flatType") || "") || null,
      roomType: String(data.get("roomType") || "") || null,
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
      if (!listing) event.currentTarget.reset();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save listing");
    } finally {
      setSaving(false);
    }
  }

  const coordinates = listing?.location?.coordinates || [0, 0];
  return (
    <form onSubmit={handleSubmit} className="overflow-hidden border border-stone-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="divide-y divide-stone-200">
          <FormSection number="01" title="Listing basics" description="The essentials renters see first.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Listing name" hint="Give it a memorable name" defaultValue={listing?.name} required className="sm:col-span-2" />
              <SelectField name="type" label="Property type" defaultValue={listing?.type || "flat"}>{types.map((type) => <option key={type} value={type}>{type}</option>)}</SelectField>
              <Field name="price" label="Monthly rent" type="number" min="0" defaultValue={listing?.price} prefix="₹" required />
              <Field name="size" label="Size" defaultValue={listing?.size} placeholder="e.g. 1200 sq ft" />
              <Field name="flatType" label="Flat type" defaultValue={listing?.flatType || ""} placeholder="e.g. 1 BHK" />
              <Field name="roomType" label="Room type" defaultValue={Array.isArray(listing?.roomType) ? listing.roomType[0] : listing?.roomType || ""} placeholder="e.g. Single" />
            </div>
          </FormSection>

          <FormSection number="02" title="Location" description="Help renters find the right area.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="state" label="State" defaultValue={getText(listing?.state)} required />
              <Field name="city" label="City" defaultValue={getText(listing?.city)} required />
              <Field name="area" label="Area / neighbourhood" defaultValue={getText(listing?.area)} />
              <Field name="pincode" label="Pincode" defaultValue={listing?.pincode} />
              <Field name="address" label="Full address" defaultValue={listing?.address} required className="sm:col-span-2" />
            </div>
            <details className="mt-5 border-t border-dashed border-stone-200 pt-4">
              <summary className="flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-wide text-stone-500"><MapPin className="h-3.5 w-3.5" /> Map coordinates</summary>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <Field name="longitude" label="Longitude" type="number" step="any" defaultValue={coordinates[0]} required />
                <Field name="latitude" label="Latitude" type="number" step="any" defaultValue={coordinates[1]} required />
              </div>
            </details>
          </FormSection>

          <FormSection number="03" title="Details" description="Add context and useful amenities.">
            <label className="block text-xs font-bold uppercase tracking-wide text-stone-600">Description<textarea name="description" defaultValue={listing?.description} rows={5} placeholder="What makes this place a good choice?" className="input-style mt-2 min-h-32 resize-y" /></label>
            <label className="mt-4 block text-xs font-bold uppercase tracking-wide text-stone-600">Facilities<span className="ml-2 font-normal normal-case tracking-normal text-stone-400">Separate with commas</span><input name="facilities" defaultValue={listing?.facilities?.join(", ")} placeholder="Parking, Wi-Fi, Lift" className="input-style mt-2" /></label>
            <fieldset className="mt-5"><legend className="text-xs font-bold uppercase tracking-wide text-stone-600">Suitable for</legend><div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">{audiences.map((audience) => <label key={audience} className="flex cursor-pointer items-center gap-2 border border-stone-200 px-3 py-2.5 text-sm capitalize transition has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50"><input type="checkbox" name="availableFor" value={audience} defaultChecked={listing?.availableFor?.includes(audience)} className="accent-orange-600" />{audience}</label>)}</div></fieldset>
          </FormSection>
        </div>

        <aside className="border-t border-stone-200 bg-stone-50 p-5 lg:border-l lg:border-t-0">
          <div className="sticky top-5">
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-stone-500">Gallery</p><h2 className="mt-1 text-lg font-bold text-stone-950">Show your space</h2></div><span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-stone-500">{images.length} added</span></div>
            <p className="mt-2 text-sm leading-5 text-stone-500">Clear photos help renters decide faster. Add at least one.</p>
            <label className="mt-5 flex min-h-28 cursor-pointer flex-col items-center justify-center border border-dashed border-orange-300 bg-orange-50 px-3 py-4 text-center transition hover:bg-orange-100"><ImagePlus className="h-6 w-6 text-orange-600" /><span className="mt-2 text-sm font-bold text-orange-700">{uploading ? "Uploading..." : "Upload photos"}</span><span className="mt-1 text-xs text-orange-700/70">JPG or PNG</span><input type="file" accept="image/*" multiple className="hidden" onChange={(event) => handleImages(event.target.files)} disabled={uploading} /></label>
            {images.length > 0 && <div className="mt-4 grid grid-cols-3 gap-2">{images.map((image, index) => <div key={`${image}-${index}`} className="group relative aspect-square overflow-hidden bg-stone-200"><img src={image} alt={`Listing ${index + 1}`} className="h-full w-full object-cover" /><button type="button" onClick={() => setImages((current) => current.filter((_, imageIndex) => imageIndex !== index))} className="absolute right-1.5 top-1.5 bg-white/95 p-1.5 text-red-600 opacity-0 shadow-sm transition group-hover:opacity-100 focus:opacity-100" aria-label="Remove image"><Trash2 className="h-3.5 w-3.5" /></button>{index === 0 && <span className="absolute bottom-1 left-1 bg-stone-950/75 px-1.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Cover</span>}</div>)}</div>}
            <div className="mt-5 border-t border-stone-200 pt-4 text-xs leading-5 text-stone-500"><p className="flex gap-2"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600" />Your first photo becomes the cover image.</p><p className="mt-2 flex gap-2"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600" />You can update photos anytime.</p></div>
          </div>
        </aside>
      </div>
      <div className="border-t border-stone-200 bg-white px-5 py-4 sm:px-7"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">{error ? <p className="border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : message ? <p className="border border-green-100 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{message}</p> : <p className="text-xs text-stone-400">Fields marked required must be completed.</p>}<button type="submit" disabled={saving || uploading} className="inline-flex items-center justify-center gap-2 bg-orange-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60">{saving && <LoaderCircle className="h-4 w-4 animate-spin" />}{saving ? "Saving..." : listing ? "Save changes" : "Publish listing"}</button></div></div>
    </form>
  );
}

function FormSection({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return <section className="p-5 sm:p-7"><div className="mb-5 flex gap-3"><span className="text-xs font-bold tracking-widest text-orange-600">{number}</span><div><h2 className="text-lg font-bold text-stone-950">{title}</h2><p className="mt-1 text-sm text-stone-500">{description}</p></div></div>{children}</section>;
}

function Field({ name, label, hint, prefix, className = "", ...props }: { name: string; label: string; hint?: string; prefix?: string; className?: string; [key: string]: unknown }) {
  return <label className={`block text-xs font-bold uppercase tracking-wide text-stone-600 ${className}`}>{label}{hint && <span className="ml-2 font-normal normal-case tracking-normal text-stone-400">{hint}</span>}<span className="relative mt-2 block">{prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-stone-400">{prefix}</span>}<input name={name} className={`input-style ${prefix ? "pl-8" : ""}`} {...props} /></span></label>;
}

function SelectField({ name, label, children, ...props }: { name: string; label: string; children: React.ReactNode; [key: string]: unknown }) {
  return <label className="block text-xs font-bold uppercase tracking-wide text-stone-600">{label}<select name={name} className="input-style mt-2 capitalize" {...props}>{children}</select></label>;
}

function getText(value?: string | { name?: string }) { return typeof value === "string" ? value : value?.name || ""; }