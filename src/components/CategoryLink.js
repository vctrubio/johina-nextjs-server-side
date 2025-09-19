"use client";

import { CATEGORY_COLORS } from "../lib/colors";

export default function CategoryLink({ 
  categoryName, 
  displayName, 
  count, 
  isSelected, 
  onClick, 
  rotation = "rotate-1" 
}) {
  return (
    <button
      onClick={() => onClick(isSelected ? 'all' : categoryName)}
      className={`marker-link relative inline-block px-3 py-1 font-semibold transition-all duration-300 hover:bg-transparent hover:${rotation} ${
        isSelected ? 'border-2 rounded-sm' : ''
      }`}
      style={{
        color: CATEGORY_COLORS[categoryName],
        backgroundColor: CATEGORY_COLORS[categoryName] + '20',
        borderColor: isSelected ? CATEGORY_COLORS[categoryName] : 'transparent',
      }}
    >
      {displayName}
      <sup className="text-xs ml-1 opacity-75">
        {count}
      </sup>
    </button>
  );
}