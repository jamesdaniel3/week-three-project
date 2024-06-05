// import React from "react";
// import "../styles/ColorPalette.css";
// import "../styles/MyRecipes.css";
// import NavBar from "../components/Navbar.jsx";
// import "../styles/Index.css";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Text,
//   Image,
//   Stack,
//   ButtonGroup,
//   Heading,
//   Divider,
//   Center,
// } from "@chakra-ui/react";
// import img from "../assets/zdz9mr_blackBear.png";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import "../styles/ColorPalette.css";
import "../styles/MyRecipes.css";
import NavBar from "../components/Navbar.jsx";
import "../styles/Index.css";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [view, setView] = useState("favorites"); // 'favorites' or 'created'

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchRecipes();
    }
  }, [user, view]);

  const fetchRecipes = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (view === "favorites") {
        const favoriteRecipes = await Promise.all(
          userData.favoritedRecipes.map(async (recipeId) => {
            const recipeDoc = await getDoc(doc(db, "recipes", recipeId));
            return { id: recipeDoc.id, ...recipeDoc.data() };
          })
        );
        setRecipes(favoriteRecipes);
      } else if (view === "created") {
        const createdRecipes = await Promise.all(
          userData.createdRecipes.map(async (recipeId) => {
            const recipeDoc = await getDoc(doc(db, "recipes", recipeId));
            return { id: recipeDoc.id, ...recipeDoc.data() };
          })
        );
        setRecipes(createdRecipes);
      }
    }
  };

  const handleButtonClick = (type) => {
    setView(type);
  };

  return (
    <>
      <NavBar />
      <div className="app">
        <header className="app-header">
          <h1>Cheffed</h1>
          <h2>Recipe library</h2>
          <div className="header-buttons">
            <button
              className="header-button"
              onClick={() => handleButtonClick("favorites")}
            >
              Favorites
            </button>
            <button
              className="header-button"
              onClick={() => handleButtonClick("created")}
            >
              Created Recipes
            </button>
          </div>
        </header>
        <main className="app-content">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                {/* Add more recipe details as needed */}
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </main>
      </div>
    </>
  );
};

export default MyRecipes;
