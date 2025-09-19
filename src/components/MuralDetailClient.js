'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MuralDetailClient({ mural, categories, relatedMurals }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const photos = mural.fields.photos || [];
  const currentPhoto = photos[currentImageIndex];
  const currentImageUrl = currentPhoto?.fields?.file?.url;
  const fullCurrentImageUrl = currentImageUrl?.startsWith('//')
    ? `https:${currentImageUrl}`
    : currentImageUrl;

  const categoryName = categories.find(
    cat => cat.sys.id === mural.fields.category?.sys?.id
  )?.fields.categoryName;

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/murals"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to murals
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-6">
            {fullCurrentImageUrl && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={fullCurrentImageUrl}
                  alt={mural.fields.title || 'Mural'}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    console.log('Mural image failed to load:', fullCurrentImageUrl);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Thumbnail Navigation */}
            {photos.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {photos.map((photo, index) => {
                  const thumbUrl = photo?.fields?.file?.url;
                  const fullThumbUrl = thumbUrl?.startsWith('//')
                    ? `https:${thumbUrl}`
                    : thumbUrl;

                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                        index === currentImageIndex
                          ? 'ring-2 ring-primary'
                          : 'hover:ring-2 hover:ring-gray-300'
                      }`}
                    >
                      {fullThumbUrl && (
                        <Image
                          src={fullThumbUrl}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mural Details */}
          <div className="space-y-8">
            <div>
              <h1 className="font-handwritten text-4xl md:text-6xl font-bold bg-gradient-nature bg-clip-text text-transparent mb-4">
                {mural.fields.title}
              </h1>
              
              {categoryName && (
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                  {categoryName}
                </span>
              )}

              {mural.fields.description && (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {mural.fields.description}
                </p>
              )}
            </div>

            {/* Photo Count */}
            <div className="flex items-center gap-4 text-gray-600">
              <span className="text-sm">
                {photos.length} photo{photos.length !== 1 ? 's' : ''}
              </span>
              {photos.length > 1 && (
                <span className="text-sm">
                  Photo {currentImageIndex + 1} of {photos.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Related Murals */}
        {relatedMurals.length > 0 && (
          <div className="mt-20">
            <h2 className="font-handwritten text-3xl font-bold text-gray-800 mb-8">
              More from {categoryName}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedMurals.map((related) => {
                const coverPhoto = related.fields.photos?.[0];
                const coverImageUrl = coverPhoto?.fields?.file?.url;
                const fullImageUrl = coverImageUrl?.startsWith('//')
                  ? `https:${coverImageUrl}`
                  : coverImageUrl;

                return (
                  <Link
                    key={related.sys.id}
                    href={`/murals/${related.fields.url}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                      {fullImageUrl && (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={fullImageUrl}
                            alt={related.fields.title || 'Mural'}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-110"
                          />
                        </div>
                      )}
                      
                      <div className="p-4">
                        <h3 className="font-handwritten text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                          {related.fields.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}