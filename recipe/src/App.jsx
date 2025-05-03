
import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import Home from "./pages/Home";
import AddFoodRecipe from "./pages/AddFoodRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import axios from "axios";

// Loaders
const getAllRecipes = async () => {
  const res = await axios.get("http://localhost:5000/recipe");
  return res.data;
};

const getMyRecipes = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const all = await getAllRecipes();
  return all.filter((item) => item.createdBy === user._id);
};

const getFavRecipes = () => JSON.parse(localStorage.getItem("fav")) || [];

export const getRecipeById = async ({ params }) => {
  const res = await fetch(`http://localhost:5000/recipe/${params.id}`);
  return await res.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/recipe/:id", element: <RecipeDetail />, loader: getRecipeById },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
