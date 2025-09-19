"use client";

import { CATEGORY_COLORS } from "../lib/colors";

export default function Category({ 
  category, 
  isActive, 
  onClick, 
  count = 0 
}) {
  const categoryName = category?.fields?.categoryName || category;
  const color = CATEGORY_COLORS[categoryName] || CATEGORY_COLORS['Other'];
  
  return (
    <button
      onClick={() => onClick(categoryName)}
      className={`
        relative px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 border-2
        ${isActive 
          ? 'text-white shadow-lg' 
          : 'text-gray-600 bg-white hover:bg-gray-50'
        }
      `}
      style={{
        backgroundColor: isActive ? color : undefined,
        borderColor: color,
      }}
    >
      {categoryName}
      {count > 0 && (
        <span className="ml-2 text-sm opacity-75">
          ({count})
        </span>
      )}
    </button>
  );
}