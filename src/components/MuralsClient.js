"use client";

import { useState } from "react";
import MuralIntro from "./MuralIntro";
import MuralGrid from "./MuralGrid";

export default function MuralsClient({ initialMurals, initialCategories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get category name from ID for filtering
  const getCategoryName = (categoryId) => {
    const category = initialCategories.find((cat) => cat.sys.id === categoryId);
    return category?.fields?.categoryName;
  };

  const filteredMurals =
    selectedCategory === "all"
      ? initialMurals
      : initialMurals.filter(
          (mural) =>
            getCategoryName(mural.fields.category?.sys?.id) ===
            selectedCategory,
        );

  return (
    <main className="min-h-screen py-20 px-4">
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
