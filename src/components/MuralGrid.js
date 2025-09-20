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
    <div className="flex flex-wrap gap-6 max-w-[2400px] mx-auto justify-center">
      {filteredMurals.map((mural) => {
        const categoryName = getCategoryName(mural.fields.category?.sys?.id);

        return (
          <div key={mural.sys.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]">
            <MuralCard mural={mural} categoryName={categoryName} />
          </div>
        );
      })}
    </div>
  );
}
