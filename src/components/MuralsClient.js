'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MuralsClient({ initialMurals, initialCategories }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Define category order
  const categoryOrder = [
    'Hotels',
    'Restaurants', 
    'Private Residences',
    'Other',
  ];

  // Sort categories by predefined order
  const sortedCategories = initialCategories.sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a.fields.categoryName);
    const bIndex = categoryOrder.indexOf(b.fields.categoryName);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  const filteredMurals =
    selectedCategory === 'all'
      ? initialMurals
      : initialMurals.filter(
          (mural) => mural.fields.category?.sys?.id === selectedCategory,
        );

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-secondary mb-6">
            Murals
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Explore my collection of murals across different categories and styles
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2 text-sm font-medium transition-all duration-300 border ${
              selectedCategory === 'all'
                ? 'bg-secondary text-white border-secondary'
                : 'bg-white text-gray-700 border-gray-200 hover:border-secondary/50 hover:bg-secondary/5'
            }`}
          >
            All
          </button>
          {sortedCategories.map((category) => (
            <button
              key={category.sys.id}
              onClick={() => setSelectedCategory(category.sys.id)}
              className={`px-5 py-2 text-sm font-medium transition-all duration-300 border ${
                selectedCategory === category.sys.id
                  ? 'bg-secondary text-white border-secondary'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-secondary/50 hover:bg-secondary/5'
              }`}
            >
              {category.fields.categoryName}
            </button>
          ))}
        </div>

        {/* Murals Grid */}
        {filteredMurals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              No murals found in this category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMurals.map((mural) => {
              const coverPhoto = mural.fields.photos?.[0];
              const coverImageUrl = coverPhoto?.fields?.file?.url;
              const fullImageUrl = coverImageUrl?.startsWith('//')
                ? `https:${coverImageUrl}`
                : coverImageUrl;

              return (
                <Link
                  key={mural.sys.id}
                  href={`/murals/${mural.fields.url}`}
                  className="group block"
                >
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-secondary/20">
                    {fullImageUrl && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={fullImageUrl}
                          alt={mural.fields.title || 'Mural'}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                          onError={(e) => {
                            console.log(
                              'Mural cover image failed to load:',
                              fullImageUrl,
                            );
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-secondary transition-colors">
                        {mural.fields.title}
                      </h3>

                      {mural.fields.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {mural.fields.description}
                        </p>
                      )}

                      {mural.fields.category && (
                        <span className="inline-block px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium">
                          {
                            initialCategories.find(
                              (cat) =>
                                cat.sys.id === mural.fields.category.sys.id,
                            )?.fields.categoryName
                          }
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}