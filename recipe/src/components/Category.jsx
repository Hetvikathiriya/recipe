import React from "react";

export const Category = ({ category, setCategory }) => {
  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Salad",
    "Soup",
    "Drinks",
  ];

  return (
    
    <div >
     
      <div className="category-buttons-text"> Explore Menu</div>
      <div className="category-buttons" >
      {categories.map((item, index) => (
        <button
          key={index}
          onClick={() => setCategory(item)}
          className={category === item ? "active" : ""}
        >
          {item}
        </button>
         ))}
      </div>
      
     
    </div>
  );
};

export default Category;
