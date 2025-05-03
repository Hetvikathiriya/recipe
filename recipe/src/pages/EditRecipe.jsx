// import axios from "axios";
// import React, { useEffect, useState } from "react";

// export default function EditRecipe() {
//   const [recipeData, setRecipeData] = useState({});
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     const getData = async () => {
//       await axios.get(`http://localhost:5000/recipe/${id}`).then((response) => {
//         let res = response.data;
//         setRecipeData({
//           title: res.title,
//           ingredients: res.ingredients.join(","),
//           instructions: res.instructions,
//           time: res.time,
//         });
//       });
//     };
//     getData();
//   }, []);

//   // create onHandlechange evenr
//   const onHandleChange = (e) => {
//     let val =
//       e.target.name === "ingredients"
//         ? e.target.value.split(",")
//         : e.target.name === "file"
//         ? e.target.files[0]
//         : e.target.value;
//     setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
//   };

//   // create onhandlesubmit event
//   const onHandleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", recipeData.title);
//     formData.append("time", recipeData.time);
//     formData.append("instructions", recipeData.instructions);
//     formData.append("file", recipeData.file);

//     // Array को handle करने के लिए
//     const ingredientsArray = Array.isArray(recipeData.ingredients)
//       ? recipeData.ingredients
//       : recipeData.ingredients?.split(",") || [];

//     ingredientsArray.forEach((ing) => {
//       formData.append("ingredients[]", ing);
//     });
//     try {
//       await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           authorization: "bearer " + localStorage.getItem("token"),
//         },
//       });
//       navigate("/myRecipe");
//     } catch (err) {
//       console.error("Error submitting recipe:", err);
//     }
//   };

//   return (
//     <>
//       {/* add recipe form */}
//       <div className="container">
//         <form className="form" onSubmit={onHandleSubmit}>
//           <div className="form-control">
//             <label>Title</label>
//             <input
//               type="text"
//               className="input"
//               name="title"
//               onChange={onHandleChange}
//               value={recipeData.title}
//             ></input>
//           </div>
//           <div className="form-control">
//             <label>Time</label>
//             <input
//               type="text"
//               className="input"
//               name="time"
//               onChange={onHandleChange}
//               value={recipeData.time}
//             ></input>
//           </div>
//           <div className="form-control">
//             <label>Ingredients</label>
//             <textarea
//               type="text"
//               className="input-textarea"
//               name="ingredients"
//               rows="3"
//               onChange={onHandleChange}
//               value={recipeData.ingredients}
//             ></textarea>
//           </div>
//           <div className="form-control">
//             <label>Instructions</label>
//             <textarea
//               type="text"
//               className="input-textarea"
//               name="instructions"
//               rows="5"
//               onChange={onHandleChange}
//               value={recipeData.instructions}
//             ></textarea>
//           </div>
//           <div className="form-control">
//             <label>Recipe Image</label>
//             <input
//               type="file"
//               className="input"
//               name="file"
//               onChange={onHandleChange}
//             ></input>
//           </div>
//           <button type="submit">Edit Recipe</button>
//         </form>
//       </div>
//     </>
//   );
// }
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      await axios.get(`http://localhost:5000/recipe/${id}`).then((response) => {
        let res = response.data;
        setRecipeData({
          title: res.title,
          category: res.category,
          ingredients: res.ingredients.join(","),
          instructions: res.instructions,
          time: res.time,
        });
      });
    };
    getData();
  }, []);

  // create onHandlechange evenr
  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.name === "file"
        ? e.target.files[0]
        : e.target.value;
    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
  };

  //   // create onhandlesubmit event
  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("time", recipeData.time);
    formData.append("instructions", recipeData.instructions);
    formData.append("file", recipeData.file);
    formData.append("category", recipeData.category);

    // Array को handle करने के लिए
    const ingredientsArray = Array.isArray(recipeData.ingredients)
      ? recipeData.ingredients
      : recipeData.ingredients?.split(",") || [];

    ingredientsArray.forEach((ing) => {
      formData.append("ingredients[]", ing);
    });
    // try {
    //   await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       authorization: "bearer " + localStorage.getItem("token"),
    //     },
    //   });
    //   navigate("/myRecipe");
    // } catch (err) {
    //   console.error("Error submitting recipe:", err);
    // }
    try {
      await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      });

      toast.success("Recipe updated successfully!");

      setTimeout(() => {
        navigate("/myRecipe");
      }, 4000); // delay navigation to allow toast to show
    } catch (err) {
      console.error("Error submitting recipe:", err);
      toast.error("Failed to update recipe.");
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
              value={recipeData.title}
            ></input>
          </div>

          <div className="form-control">
            <label>Category</label>
            <select
              className="category-section"
              name="category"
              value={recipeData.category || ""}
              onChange={onHandleChange}
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
              value={recipeData.time}
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
              value={recipeData.ingredients}
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
              value={recipeData.instructions}
            ></textarea>
          </div>
          <div className="form-control">
            <label>Recipe Image</label>
            <input
              type="file"
              className="input"
              name="file"
              onChange={onHandleChange}
            ></input>
          </div>
          <button type="submit">Edit Recipe</button>
        </form>
      </div>
    </>
  );
}
