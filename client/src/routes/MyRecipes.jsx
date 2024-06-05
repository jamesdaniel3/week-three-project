import React from "react";
import "../styles/ColorPalette.css";
import "../styles/MyRecipes.css";
import NavBar from "../components/Navbar.jsx";

const RecipeItem = ({ title, description }) => (
  <div className="recipe-item">
    <h2 className="recipe-title">{title}</h2>
    <p className="recipe-description">{description}</p>
  </div>
);

const MyRecipes = () => {
  return (
    <>
      <NavBar />
      <button></button>
      <div className="recipes-body">
        <div className="recipes-main">
          <div className="recipes-header">
            <h1>My Recipes</h1>
          </div>
          <div className="recipe-list">
            <RecipeItem
              title="Chocolate Cake"
              description="A delicious chocolate cake with rich chocolate frosting."
            />
            <RecipeItem
              title="Caesar Salad"
              description="A classic Caesar salad with homemade croutons and dressing."
            />
            {/* Add more RecipeItem components as needed */}
          </div>
          <button className="add-recipe-button">Add Recipe</button>
          <div className="error-message" style={{ display: "none" }}>
            Error message goes here
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRecipes;
