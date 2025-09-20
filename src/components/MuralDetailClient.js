"use client";

import Image from "next/image";
import Link from "next/link";
import ImageCarousel from "./ImageCarousel";
import { CATEGORY_COLORS, COLORS } from "../lib/colors";

export default function MuralDetailClient({
  mural,
  categories,
  relatedMurals,
}) {
  const photos = mural.fields.photos || [];
  const categoryData = categories.find(
    (cat) => cat.sys.id === mural.fields.category?.sys?.id,
  );
  const categoryName = categoryData?.fields.categoryName;
  const categoryColor = CATEGORY_COLORS[categoryName] || "#8CB150";
  const tertiaryColor = COLORS.tertiary;

  // Shuffle related murals to randomize order
  const shuffledRelatedMurals = [...relatedMurals].sort(() => Math.random() - 0.5);

  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mt-6">
          <h1
            className="font-serif text-5xl md:text-7xl font-light tracking-wide"
            style={{ color: tertiaryColor }}
          >
            {mural.fields.title}
          </h1>
        </div>

        <div
          className={mural.fields.description ? "grid grid-cols-1 lg:grid-cols-2 gap-16" : "flex justify-center"}
        >
          {/* Image Carousel */}
          <div className={mural.fields.description ? "" : "w-full lg:w-4/5"}>
            {photos.length > 0 && (
              <ImageCarousel
                images={photos
                  .map((photo) => {
                    const url = photo?.fields?.file?.url;
                    return url?.startsWith("//") ? `https:${url}` : url;
                  })
                  .filter(Boolean)}
                title={""}
                enableLightbox={true}
              />
            )}
          </div>

          {/* Description */}
          {mural.fields.description && (
            <div className="flex items-center mt-2">
              <div className="pt-8 mx-auto text-center">
                <p className="font-light text-2xl text-gray-800 leading-relaxed tracking-wide">
                  {mural.fields.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Related Murals Section */}
        {relatedMurals.length > 0 && (
          <div className="mt-32">
            <div className="text-center mb-16">
              <h2
                className="font-serif text-2xl font-light mb-8"
                style={{ color: tertiaryColor }}
              >
                More from {categoryName}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {shuffledRelatedMurals.map((related) => {
                const coverPhoto = related.fields.photos?.[0];
                const coverImageUrl = coverPhoto?.fields?.file?.url;
                const fullImageUrl = coverImageUrl?.startsWith("//")
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
                            alt={related.fields.title || "Mural"}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-110"
                          />
                        </div>
                      )}

                      <div className="p-4 text-center">
                        <h3 className="font-serif text-xl font-light text-gray-800 group-hover:text-primary transition-colors">
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

        {/* See All Button */}
        <div className="mt-16 text-center">
          <Link
            href="/murals"
            className="inline-flex items-center px-10 py-4 rounded-full font-serif text-lg font-light tracking-wide transition-all duration-1000 ease-in-out border-2 bg-transparent"
            style={{
              borderColor: categoryColor,
              color: categoryColor,
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = categoryColor;
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = categoryColor;
            }}
          >
            See All Murals
          </Link>
        </div>
      </div>
    </main>
  );
}
