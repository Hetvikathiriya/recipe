import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  // create onHandlechange evenr
  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients"
        ? e.target.value.split(";")
        : e.target.name === "file"
        ? e.target.files[0]
        : e.target.value;
    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
  };

  // create onhandlesubmit event
  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("time", recipeData.time);
    formData.append("category", recipeData.category);
    formData.append("instructions", recipeData.instructions);
    formData.append("file", recipeData.file);
    formData.append("file", recipeData.category);

    // Array को handle करने के लिए
    recipeData.ingredients?.forEach((ing, i) => {
      formData.append("ingredients[]", ing);
    });

    try {
      await axios.post("http://localhost:5000/recipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      });

      toast.success(" Recipe added successfully!");

      // Navigate after a short delay so user can see toast
      setTimeout(() => navigate("/"), 4000);
    } catch (err) {
      console.error("Error submitting recipe:", err);
      toast.error("❌ Failed to add recipe. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {/* add recipe form */}
      <div className="container">
        <form className="form" onSubmit={onHandleSubmit}>
          <div className="form-control">
            <label>Title</label>
            <input
              type="text"
              className="input"
              name="title"
              onChange={onHandleChange}
              required
            ></input>
          </div>

          <div className="form-control">
            <label>Category</label>
            <select
              className="category-section"
              name="category"
              value={recipeData.category || ""}
              onChange={onHandleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Salad">Salad</option>
              <option value="Soup">Soup</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="form-control">
            <label>Time</label>
            <input
              type="text"
              className="input"
              name="time"
              onChange={onHandleChange}
              required
            ></input>
          </div>
          <div className="form-control">
            <label>Ingredients</label>
            <textarea
              type="text"
              className="input-textarea"
              name="ingredients"
              rows="3"
              onChange={onHandleChange}
              required
            ></textarea>
          </div>
          <div className="form-control">
            <label>Instructions</label>
            <textarea
              type="text"
              className="input-textarea"
              name="instructions"
              rows="5"
              onChange={onHandleChange}
              required
            ></textarea>
          </div>
          <div className="form-control">
            <label>Recipe Image</label>
            <input
              type="file"
              className="input"
              name="file"
              onChange={onHandleChange}
              required
            ></input>
          </div>
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </>
  );
}
