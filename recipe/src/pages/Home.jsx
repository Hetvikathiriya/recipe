import React, { useState, useEffect } from "react";
import foodRecipe from "../assets/foodRecipe.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Recipeitems from "../components/Recipeitems";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import InputForm from "../components/InputForm";
import CategoryDisplay from "../components/CategoryDisplay";
import Category from "../components/Category";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("All"); // or any default category

  useEffect(() => {
    // get all recipes
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipe");
        setRecipes(response.data);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      }
    };

    fetchRecipes();
  }, []);
 
  // add recipe
  const addRecipe = () => {
    let token = localStorage.getItem("token");
    if (token) navigate("/addRecipe");
    else {
      setIsOpen(true);
    }
  };
  return (
    <>
      <section className="home">
        <div className="left">
          <h1>Testify</h1>
          <h5>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable
          </h5>
          <button onClick={addRecipe}>Share your recipe</button>
        </div>
        {/* food recipe img */}
        <div className="right">
          <img src={foodRecipe} width="700px" height="700px"></img>
        </div>
      </section>
      {/* add backgroud waves*/}
      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#d4f6e8"
            fillOpacity="1"
            d="M0,32L40,32C80,32,160,32,240,58.7C320,85,400,139,480,149.3C560,160,640,128,720,101.3C800,75,880,53,960,80C1040,107,1120,181,1200,213.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}

      <Category category={category} setCategory={setCategory} />
      <CategoryDisplay category={category} allRecipes={recipes} />

      {/* <div className="recipe">
        <Recipeitems />
      </div> */}
      
    </>
    
  );
}
