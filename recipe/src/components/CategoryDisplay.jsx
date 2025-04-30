// // // import React, { useState, useEffect } from "react";
// // // import RecipeItems from "./Recipeitems";
// // // import Category from "./Category";
// // // import axios from "axios";

// // // export default function CategoryDisplay() {
// // //   const [allRecipes, setAllRecipes] = useState([]);

// // //   useEffect(() => {
// // //     const fetchRecipes = async () => {
// // //       try {
// // //         const response = await axios.get("http://localhost:5000/recipe"); // Change URL as per your backend
// // //         setAllRecipes(response.data);
// // //       } catch (error) {
// // //         console.error("Failed to fetch recipes", error);
// // //       }
// // //     };

// // //     fetchRecipes();
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <h2>Top dishes</h2>

// // //       <div>
// // //         {allRecipes?.map((item, index) => {
// // //           if (Category === "All" || Category === item.Category) {
// // //             return (
// // //               <RecipeItems
// // //                 key={index}
// // //                 id={item._id}
// // //                 title={item.title}
// // //                 coverImage={item.coverImage}
// // //               />
// // //             );
// // //           }
// // //         })}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useState, useEffect } from "react";
// // import RecipeItems from "./Recipeitems";
// // import axios from "axios";

// // export default function CategoryDisplay({ category }) {
// //   const [allRecipes, setAllRecipes] = useState([]);

// //   useEffect(() => {
// //     const fetchRecipes = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:5000/recipe");
// //         setAllRecipes(response.data);
// //       } catch (error) {
// //         console.error("Failed to fetch recipes", error);
// //       }
// //     };

// //     fetchRecipes();
// //   }, []);

// //   console.log("Selected Category:", category);
// //   console.log("All recipes:", allRecipes);

// //   // This filters recipes by selected category
// //   const filteredRecipes =
// //     category === "All"
// //       ? allRecipes
// //       : allRecipes.filter((item) => item.category === category);

// //   return (
// //     <div>
// //       <h2>Top Dishes</h2>
// //       <div>
// //         {filteredRecipes.length > 0 ? (
// //           filteredRecipes.map((item, index) => (
// //             <RecipeItems
// //               key={index}
// //               id={item._id}
// //               title={item.title}
// //               coverImage={item.coverImage}
// //             />
// //           ))
// //         ) : (
// //           <p>No recipes found in this category.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import RecipeItems from "./Recipeitems";
// import axios from "axios";

// export default function CategoryDisplay({ category }) {
//   const [allRecipes, setAllRecipes] = useState([]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/recipe");
//         setAllRecipes(response.data);
//       } catch (error) {
//         console.error("Failed to fetch recipes", error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   console.log("Selected Category:", category);
//   console.log("All recipes:", allRecipes);

//   // This filters recipes by the selected category
//   const filteredRecipes =
//     category === "All"
//       ? allRecipes
//       : allRecipes.filter((item) => item.category === category);

//   console.log("Filtered Recipes:", filteredRecipes); // Log filtered recipes

//   return (
//     <div>
//       <h2>Top Dishes</h2>
//       <div>
//         {filteredRecipes.length > 0 ? (
//           filteredRecipes.map((item, index) => (
//             <RecipeItems
//               key={index}
//               id={item._id}
//               title={item.title}
//               coverImage={item.coverImage}
//             />
//           ))
//         ) : (
//           <p>No recipes found in this category.</p>
//         )}
//       </div>
//     </div>
//   );
// }
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
