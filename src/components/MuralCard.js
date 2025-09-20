"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY_COLORS } from "../lib/colors";

export default function MuralCard({ mural, categoryName }) {
  const [imageError, setImageError] = useState(false);

  const photos = mural.fields.photos || [];
  const coverPhoto = photos[0];
  const imageUrl = coverPhoto?.fields?.file?.url;
  const fullImageUrl = imageUrl?.startsWith("//")
    ? `https:${imageUrl}`
    : imageUrl;

  const color = CATEGORY_COLORS[categoryName] || CATEGORY_COLORS["Other"];

  return (
    <Link
      href={`/murals/${mural.fields.url}`}
      className="group block w-80 sm:w-96 lg:w-[28rem]"
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-96 sm:h-[28rem] lg:h-[32rem]">
        {/* Cover Image */}
        <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
          <Image
            src={
              fullImageUrl && !imageError ? fullImageUrl : "/img-not-found.jpg"
            }
            alt={mural.fields.title || "Mural"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        </div>

        {/* Title with marker effect on hover */}
        <div className="p-4 sm:p-6 h-24 sm:h-32 lg:h-36 flex items-center justify-center">
          <h3 className="relative font-medium text-lg sm:text-xl lg:text-2xl text-gray-800 group-hover:text-gray-900 transition-colors duration-300 text-center">
            <span
              className="marker-title relative inline-block px-3 rounded-full transition-all duration-500 group-hover:transform group-hover:-rotate-1"
              style={{
                "--marker-color": color + "20", // 20% opacity
                "--marker-text-color": color,
              }}
            >
              {mural.fields.title}
            </span>
          </h3>
        </div>
      </div>
    </Link>
  );
}
