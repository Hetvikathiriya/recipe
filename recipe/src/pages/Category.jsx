// import React from "react";
// import categories from "../assets/categoryimg/CategoryMenu";
// import { useNavigate } from "react-router-dom";

// const CategoryMenu = () => {
//   const navigate = useNavigate();

//   const handleCategoryClick = (category) => {
//     navigate(`/category/${category}`);
//   };

//   return (
//     <div className="category-section">
//       <h2>Explore our menu</h2>
//       <p>Choose from a diverse menu featuring a delectable array of dishes.</p>
//       <div className="category-list">
//         {categories.map((cat) => (
//           <div
//             key={cat.name}
//             className="category-item"
//             onClick={() => handleCategoryClick(cat.name)}
//           >
//             <img src={cat.image} alt={cat.name} />
//             <p>{cat.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryMenu;
import React from "react";
import categories from "../assets/categoryimg/CategoryMenu";
import axios from "axios";

const Category = ({ setFilteredRecipes }) => {
  const handleCategoryClick = async (category) => {
    try {
      const res = await axios.get(`http://localhost:5000/recipe/category/${category}`);
      setFilteredRecipes(res.data);
    } catch (err) {
      console.error("Failed to fetch recipes by category:", err);
    }
  };

  return (
    <div className="category-section">
      <h2>Explore our menu</h2>
      <p>Choose from a diverse menu featuring a delectable array of dishes.</p>

      <div className="category-list">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="category-item"
            onClick={() => handleCategoryClick(cat.name)}
          >
            <img src={cat.image} alt={cat.name} className="category-image" />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
