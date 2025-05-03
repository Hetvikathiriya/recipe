 import React, { useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";


export default function RecipeItems({ recipes }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigate = useNavigate();
  let path = window.location.pathname === "/myRecipe";
  let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
  const [isFavRecipe, setIsFavRecipe] = useState(false);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes, isFavRecipe]); // Recalculate on favorite toggle

  // delete functionality
  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/recipe/${id}`);
    const updated = filteredRecipes.filter((recipe) => recipe._id !== id);
    setFilteredRecipes(updated);
    const updatedFavs = favItems.filter((recipe) => recipe._id !== id);
    localStorage.setItem("fav", JSON.stringify(updatedFavs));
  };

  // save recipe functionality4
  const favRecipe = (item) => {
    const isFav = favItems.some((recipe) => recipe._id === item._id);
    favItems = isFav
      ? favItems.filter((recipe) => recipe._id !== item._id)
      : [...favItems, item];
    localStorage.setItem("fav", JSON.stringify(favItems));
    setIsFavRecipe((prev) => !prev);
  };

  return (
    <div className="card-container">
      {filteredRecipes?.map((item, index) => (
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
