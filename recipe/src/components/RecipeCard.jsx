// // RecipeCard.jsx
// import React from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { BsStopwatchFill } from "react-icons/bs";
// import { FaHeart } from "react-icons/fa6";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

// export default function RecipeCard({
//   item,
//   onDelete,
//   onFavToggle,
//   isFav,
//   path,
// }) {
//   const navigate = useNavigate();

//   return (
//     <div className="card" onDoubleClick={() => navigate(`/recipe/${item._id}`)}>
//       <img
//         src={`http://localhost:5000/images/${item.coverImage}`}
//         width="120px"
//         height="100px"
//         alt={item.title}
//       />
//       <div className="card-body">
//         <div className="title">{item.title}</div>
//         <div className="icons">
//           <div className="timer">
//             <BsStopwatchFill />
//             {item.time}
//           </div>
//           {!path ? (
//             <FaHeart
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onFavToggle(item);
//               }}
//               style={{ color: isFav ? "red" : "" }}
//             />
//           ) : (
//             <div className="action">
//               <Link
//                 to={`/editRecipe/${item._id}`}
//                 className="editIcon"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <FaEdit />
//               </Link>
//               <MdDelete
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onDelete(item._id);
//                 }}
//                 className="deleteIcon"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function RecipeItems() {
  const recipes = useLoaderData();
  const [allRecipes, setAllRecipes] = useState();
  let path = window.location.pathname === "/myRecipe";
  let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
  const [isFavRecipe, setIsFavRecipe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAllRecipes(recipes);
  }, [recipes]);

  //   // delete function
  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/recipe/${id}`);
    setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
    let filterItem = favItems.filter((recipe) => recipe._id !== id);
    localStorage.setItem("fav", JSON.stringify(filterItem));
  };

  //   saved recipe function
  const favRecipe = (item) => {
    let filterItem = favItems.filter((recipe) => recipe._id !== item._id);
    favItems =
      favItems.filter((recipe) => recipe._id === item._id).length === 0
        ? [...favItems, item]
        : filterItem;
    localStorage.setItem("fav", JSON.stringify(favItems));
    setIsFavRecipe((pre) => !pre);
  };

  return (
    <div className="card-container">
      {allRecipes?.map((item, index) => (
        <div
          key={index}
          className="card"
          onDoubleClick={() => navigate(`/recipe/${item._id}`)}
        >
          <img
            src={`http://localhost:5000/images/${item.coverImage}`}
            width="120px"
            height="100px"
            alt={item.title}
          />
          <div className="card-body">
            <div className="title">{item.title}</div>
            <div className="icons">
              <div className="timer">
                <BsStopwatchFill />
                {item.time}
              </div>
              {!path ? (
                <FaHeart
                  onClick={(e) => {
                    e.stopPropagation();
                    favRecipe(item);
                  }}
                  style={{
                    color: favItems.some((res) => res._id === item._id)
                      ? "red"
                      : "",
                  }}
                />
              ) : (
                <div className="action">
                  <Link
                    to={`/editRecipe/${item._id}`}
                    className="editIcon"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaEdit />
                  </Link>
                  <MdDelete
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item._id);
                    }}
                    className="deleteIcon"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
