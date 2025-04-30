 
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

export default function RecipeDetail() {
  const recipe = useLoaderData();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Format instructions into separate steps
  const instructionSteps = recipe.instructions
    .split(/(?=\d+\.)/) // split by numbered steps
    .map((step) => step.trim())
    .filter((step) => step);

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>

      <img
        src={`http://localhost:5000/images/${recipe.coverImage}`}
        alt={recipe.title}
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />

      <p>
        <strong style={{ fontSize: "1.3rem" }}>Time:</strong> {recipe.time}
      </p>

      <h4>Ingredients:</h4>
      <ul>
        {recipe.ingredients.map((item, i) => (
          <li key={i} style={{ marginBottom: "6px" }}>
            {item}
          </li>
        ))}
      </ul>

      <h4 style={{ fontSize: "20px", marginBottom: "8px" }}>Instructions:</h4>
      <div>
        {instructionSteps.map((step, index) => (
          <p
            key={index}
            style={{
              background: "#f9f9f9",
              padding: "10px 15px",
              borderRadius: "8px",
              marginBottom: "10px",
              lineHeight: "1.6",
            }}
          >
            <strong>Step {index + 1}:</strong> {step.replace(/^\d+\.\s*/, "")}
          </p>
        ))}
      </div>
    </div>
  );
}
