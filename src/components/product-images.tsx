
import { useState, useEffect } from "react";
import type { ProductImage } from "@/entities/product"
import { useLocalStorageState } from "@/hooks/use-local-storage-state";

interface ProductImagesProps {
  images: ProductImage[];
}

export function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useLocalStorageState<string>(
    "selectedImage",
    images.length > 0 ? images[0].id : ""
  );

  const [mainImage, setMainImage] = useState<ProductImage | undefined>(
    images.find((img) => img.id === selectedImage) || images[0]
  );

  useEffect(() => {
    const image = images.find((img) => img.id === selectedImage) || images[0];
    setMainImage(image);
  }, [selectedImage, images]);

  const handleThumbnailClick = (imageId: string) => {
    setSelectedImage(imageId);
  };

  if (!images.length) return null;

  return (
    <div className="flex flex-col space-y-4">
      <div className="overflow-hidden rounded-lg bg-white border border-gray-200">
        {mainImage && (
          <img
            src={mainImage.url}
            alt={mainImage.alt}
            className="w-full h-auto object-contain aspect-square"
          />
        )}
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => handleThumbnailClick(image.id)}
            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${selectedImage === image.id
              ? "border-blue-500 shadow-md"
              : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
