
import React from "react";
import RecipeItems from "./Recipeitems"; // यहीं से UI दिखेगा

export default function CategoryDisplay({ category, allRecipes }) {
  const filteredRecipes =
    category === "All"
      ? allRecipes
      : allRecipes.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <div>
      {filteredRecipes.length > 0 ? (
        <RecipeItems recipes={filteredRecipes} />
      ) : (
        <p style={{ fontSize: 30, textAlign: "center" }}>
          No recipes found in this category.
        </p>
      )}
    </div>
  );
}
