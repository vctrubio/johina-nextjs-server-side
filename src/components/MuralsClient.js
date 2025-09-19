'use client';

import { useState } from 'react';
import MuralCard from './MuralCard';
import Category from './Category';

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

  // Get category name from ID for filtering
  const getCategoryName = (categoryId) => {
    const category = initialCategories.find(cat => cat.sys.id === categoryId);
    return category?.fields?.categoryName;
  };

  const filteredMurals =
    selectedCategory === 'all'
      ? initialMurals
      : initialMurals.filter(
          (mural) => getCategoryName(mural.fields.category?.sys?.id) === selectedCategory,
        );

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Clean minimal header */}
        <div className="text-center mb-16">
          <h1 className="font-handwritten text-6xl md:text-8xl font-bold bg-gradient-nature bg-clip-text text-transparent mb-8">
            Murals
          </h1>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <Category
            category="All"
            isActive={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            count={initialMurals.length}
          />
          {sortedCategories.map((category) => {
            const categoryName = category.fields.categoryName;
            const categoryCount = initialMurals.filter(
              mural => getCategoryName(mural.fields.category?.sys?.id) === categoryName
            ).length;
            
            return (
              <Category
                key={category.sys.id}
                category={category}
                isActive={selectedCategory === categoryName}
                onClick={() => setSelectedCategory(categoryName)}
                count={categoryCount}
              />
            );
          })}
        </div>

        {/* Murals Grid */}
        {filteredMurals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              No murals found in this category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMurals.map((mural) => {
              const categoryName = getCategoryName(mural.fields.category?.sys?.id);
              
              return (
                <MuralCard
                  key={mural.sys.id}
                  mural={mural}
                  categoryName={categoryName}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}