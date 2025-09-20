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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[2400px] mx-auto">
      {filteredMurals.map((mural) => {
        const categoryName = getCategoryName(mural.fields.category?.sys?.id);

        return (
          <div key={mural.sys.id}>
            <MuralCard mural={mural} categoryName={categoryName} />
          </div>
        );
      })}
    </div>
  );
}
