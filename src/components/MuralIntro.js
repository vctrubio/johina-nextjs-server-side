"use client";

import CategoryLink from "./CategoryLink";

export default function MuralIntro({ 
  selectedCategory, 
  setSelectedCategory, 
  initialMurals, 
  getCategoryName 
}) {
  const getCategoryCount = (categoryName) => {
    return initialMurals.filter(
      mural => getCategoryName(mural.fields.category?.sys?.id) === categoryName
    ).length;
  };

  return (
    <div className="text-center mb-16">
      {/* Inline Category Navigation */}
      <div className="max-w-4xl mx-auto">
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          <span className="font-handwritten text-4xl text-gray-800 font-bold mr-2 tracking-widest">Johina</span>
          began her career as a muralist in England in{" "}
          <span className="font-handwritten text-2xl text-fifth font-bold">1987</span>
          . Since then, she has been painting murals for{" "}
          <CategoryLink
            categoryName="Hotels"
            displayName="hotels"
            count={getCategoryCount('Hotels')}
            isSelected={selectedCategory === 'Hotels'}
            onClick={setSelectedCategory}
            rotation="-rotate-1"
          />
          ,{" "}
          <CategoryLink
            categoryName="Restaurants"
            displayName="restaurants"
            count={getCategoryCount('Restaurants')}
            isSelected={selectedCategory === 'Restaurants'}
            onClick={setSelectedCategory}
            rotation="rotate-1"
          />
          ,{" "}
          <CategoryLink
            categoryName="Private Residences"
            displayName="private residences"
            count={getCategoryCount('Private Residences')}
            isSelected={selectedCategory === 'Private Residences'}
            onClick={setSelectedCategory}
            rotation="-rotate-1"
          />
          {" "}and{" "}
          <CategoryLink
            categoryName="Other"
            displayName="other prestigious venues"
            count={getCategoryCount('Other')}
            isSelected={selectedCategory === 'Other'}
            onClick={setSelectedCategory}
            rotation="rotate-2"
          />
          {" "}across England, France, and Spain.
        </p>
        
        <div className="w-24 h-0.5 bg-gray-300 mx-auto my-6"></div>
        
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          With a Master&apos;s from Christie&apos;s and a degree in <span className="font-bold">restoration</span>, she brings history to life through murals, fabric patterns, and stage backgrounds.
        </p>
      </div>
    </div>
  );
}