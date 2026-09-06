import { ImageOff } from "lucide-react";

type ListingGalleryProps = {
  images: string[];
  title: string;
};

export default function ListingGallery({ images, title }: ListingGalleryProps) {
  const gallery = images.length > 0 ? images : ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5"];

  return (
    <section className="grid min-h-[280px] grid-cols-4 grid-rows-2 gap-1 overflow-hidden border border-gray-200 bg-gray-200 sm:min-h-[360px]">
      <img src={gallery[0]} alt={title} className="col-span-4 row-span-2 h-full min-h-[280px] w-full object-cover sm:col-span-3 sm:min-h-[360px]" />
      <div className="hidden grid-rows-2 gap-1 sm:grid">
        {gallery.slice(1, 3).map((image, index) => (
          <img key={`${image}-${index}`} src={image} alt={`${title} ${index + 2}`} className="h-full min-h-0 w-full object-cover" />
        ))}
      </div>
      {images.length === 0 && (
        <div className="absolute hidden items-center gap-1 text-xs text-white sm:flex">
          <ImageOff className="h-3 w-3" />
          No photos
        </div>
      )}
    </section>
  );
}