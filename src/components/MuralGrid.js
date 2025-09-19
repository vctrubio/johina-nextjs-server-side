"use client";

import MuralCard from "./MuralCard";

export default function MuralGrid({ filteredMurals, getCategoryName }) {
  if (filteredMurals.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">
          No murals found in this category
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-around gap-6">
      {filteredMurals.map((mural) => {
        const categoryName = getCategoryName(mural.fields.category?.sys?.id);
        
        return (
          <div key={mural.sys.id} className="flex-none">
            <MuralCard
              mural={mural}
              categoryName={categoryName}
            />
          </div>
        );
      })}
    </div>
  );
}