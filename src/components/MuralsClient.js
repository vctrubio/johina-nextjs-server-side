'use client';

import { useState } from 'react';
import MuralIntro from './MuralIntro';
import MuralGrid from './MuralGrid';

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
      <div className="mx-auto">
        <MuralIntro 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          initialMurals={initialMurals}
          getCategoryName={getCategoryName}
        />

        <MuralGrid 
          filteredMurals={filteredMurals}
          getCategoryName={getCategoryName}
        />
      </div>
    </main>
  );
}