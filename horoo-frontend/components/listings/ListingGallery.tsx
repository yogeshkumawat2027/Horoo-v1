import { ImageOff } from "lucide-react";

type ListingGalleryProps = {
  images: string[];
  title: string;
};

export default function ListingGallery({ images, title }: ListingGalleryProps) {
  const gallery = images.length > 0 ? images : ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5"];

  return (
    <section className="relative overflow-hidden bg-gray-200 sm:grid sm:h-[330px] sm:grid-cols-2 sm:grid-rows-2 sm:gap-1">
      <img src={gallery[0]} alt={title} className="h-64 w-full object-cover sm:row-span-2 sm:h-full" />
      <div className="hidden min-w-0 grid-cols-2 grid-rows-2 gap-1 sm:col-start-2 sm:row-span-2 sm:grid">
        {gallery.slice(1, 5).map((image, index) => (
          <div key={`${image}-${index}`} className="relative min-h-0 overflow-hidden bg-gray-300">
            <img src={image} alt={`${title} ${index + 2}`} className="h-full w-full object-cover" />
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-center text-white">
                <span className="text-xl font-bold">+{images.length - 4}<span className="block text-xs font-medium">more photos</span></span>
              </div>
            )}
          </div>
        ))}
      </div>
      {images.length === 0 && (
        <div className="absolute inset-0 hidden items-center justify-center gap-1 text-xs text-white sm:flex">
          <ImageOff className="h-3 w-3" />
          No photos
        </div>
      )}
    </section>
  );
}