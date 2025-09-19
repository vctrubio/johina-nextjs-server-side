'use client';

import Image from 'next/image';

export default function GalleryGrid({ bannersData }) {
  if (!bannersData?.entries?.length) {
    console.log('No banners data:', bannersData);
    return null;
  }

  // Extract image URLs from Contentful data - handling array of images
  const galleryImages = [];
  bannersData.entries.forEach(entry => {
    const imagesField = entry.fields.images;
    if (Array.isArray(imagesField)) {
      imagesField.forEach(img => {
        const url = img?.fields?.file?.url;
        if (url) {
          galleryImages.push(url.startsWith('//') ? `https:${url}` : url);
        }
      });
    }
  });

  console.log('Gallery images extracted:', galleryImages);

  if (galleryImages.length === 0) {
    console.log('No valid gallery images found');
    return null;
  }

  // Show first 8 images for the grid
  const displayImages = galleryImages.slice(0, 8);

  return (
    <section>
      <div className="w-full">
        <div className="grid grid-cols-1 gap-32 py-20">
          {displayImages.map((imageUrl, index) => (
            <Image
              key={index}
              src={imageUrl}
              alt={`Gallery image ${index + 1}`}
              width={600}
              height={450}
              className="mx-auto h-auto object-cover transition-transform duration-300 hover:scale-105 rounded-2xl shadow-2xl border-4 border-white/20 relative z-20"
              onError={(e) => {
                console.log('Gallery image failed to load:', imageUrl);
                e.target.style.display = 'none';
              }}
              onLoad={() => console.log('Gallery image loaded successfully:', imageUrl)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}