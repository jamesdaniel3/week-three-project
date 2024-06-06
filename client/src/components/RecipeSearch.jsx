import React, { useState } from "react";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";
import RecipeCard from "./Card.jsx";
import RecipeModal from "./Modal.jsx";
import "../styles/RecipeSearch.css";
import img from "../assets/zdz9mr_blackBear.png";

const dietOptions = ["", "balanced", "high-fiber", "high-protein", "low-carb", "low-fat", "low-sodium"];
const healthOptions = [
  "", "alcohol-cocktail", "alcohol-free", "celery-free", "crustacean-free", "dairy-free", "DASH", 
  "egg-free", "fish-free", "fodmap-free", "gluten-free", "immuno-supportive", "keto-friendly", 
  "kidney-friendly", "kosher", "low-fat-abs", "low-potassium", "low-sugar", "lupine-free", 
  "Mediterranean", "mollusk-free", "mustard-free", "no-oil-added", "paleo", "peanut-free", 
  "pescatarian", "pork-free", "red-meat-free", "sesame-free", "shellfish-free", "soy-free", 
  "sugar-conscious", "sulfite-free", "tree-nut-free", "vegan", "vegetarian", "wheat-free"
];
const cuisineOptions = [
  "", "American", "Asian", "British", "Caribbean", "Central Europe", "Chinese", "Eastern Europe", 
  "French", "Indian", "Italian", "Japanese", "Kosher", "Mediterranean", "Mexican", "Middle Eastern", 
  "Nordic", "South American", "South East Asian"
];
const mealOptions = ["", "Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];
const dishOptions = [
  "", "Biscuits and cookies", "Bread", "Cereals", "Condiments and sauces", "Desserts", "Drinks", 
  "Main course", "Pancake", "Preps", "Preserve", "Salad", "Sandwiches", "Side dish", "Soup", "Starter", 
  "Sweets"
];

const RecipeSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("edamam");
  const [currentSource, setCurrentSource] = useState("edamam");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [diet, setDiet] = useState("");
  const [health, setHealth] = useState("");
  const [cuisineType, setcuisineType] = useState("");
  const [mealType, setMealType] = useState("");
  const [dishType, setDishType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = e.target.elements.query.value;

    setLoading(true);
    try {
      if (source === "edamam") {
        const params = {
          ...(q && { q }),
          ...(diet && { diet }),
          ...(health && { health }),
          ...(cuisineType && { cuisineType }),
          ...(mealType && { mealType }),
          ...(dishType && { dishType }),
        };
        const response = await axios.get(
          "http://localhost:8888/edamam/recipesearch",
          {
            params
          }
        );
        setSearchResults(response.data.hits);
        setCurrentSource(source);
      } else if (source === "userCreated") {
        const response = await axios.get("http://localhost:8888/recipefirebase/recipes");
        const filteredData = response.data.filter((recipe) =>
          recipe.userCreated && recipe.name.toLowerCase().includes(q.toLowerCase() )
        );
        setSearchResults(filteredData);
        setCurrentSource(source);
       
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  return (
    <div className="page-container">
      <div className="search-bar">
        <form id="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            className="text-input"
            placeholder="Search for a recipe..."
          />
          <button type="submit" className="submit-button2">
            Search
          </button>
          <div class="line"></div>
          <div className="radio-toolbar">
          <input           
          type="radio"
          name="source"
          id="edamam"
          value="edamam"
          checked={source === "edamam"}
          onChange={handleSourceChange}
        />
        <label htmlFor="edamam">Edamam</label>

        <input
          id="userCreated"
          type="radio"
          name="source"
          value="userCreated"
          checked={source === "userCreated"}
          onChange={handleSourceChange}
        />
        <label htmlFor="userCreated">User Created</label>
          </div>
        </form>
      </div>
      
      <div className="options-container">
        <div className="option-container">
          <p>Diet</p>
          <select 
          value={diet}
          name="diet"
          onChange={(e) => setDiet(e.target.value)}
          className="select"
        >
          {dietOptions.map((option) => (
            <option key={option} value={option}>{option || '--'}</option>
          ))}
        </select>
        </div>
        
        <div className="option-container">
          <p>Health</p>
          <select         
          value={health}
          name="health"
          onChange={(e) => setHealth(e.target.value)}
          className="select"
        >
          {healthOptions.map((option) => (
            <option key={option} value={option}>{option || '--'}</option>
          ))}
        </select>
        </div>
        
        <div className="option-container">
          <p>Cuisine Type</p>
           <select 
          value={cuisineType}
          name="cuisineType"
          onChange={(e) => setcuisineType(e.target.value)}
          className="select"
        >
          {cuisineOptions.map((option) => (
            <option key={option} value={option}>{option || '--'}</option>
          ))}
        </select>
        </div>
       
        <div className="option-container">
          <p>Meal Type</p>
          <select 
          value={mealType}
          name="mealType"
          onChange={(e) => setMealType(e.target.value)}
          className="select"
        >
          {mealOptions.map((option) => (
            <option key={option} value={option}>{option || '--'}</option>
          ))}
        </select>
        </div>
        
        <div className="option-container">
          <p>Dish Type</p>
          <select 
          value={dishType}
          name="dishType"
          onChange={(e) => setDishType(e.target.value)}
          className="select"
        >
          {dishOptions.map((option) => (
            <option key={option} value={option}>{option || '--'}</option>
          ))}
        </select>
        </div>
        


      </div>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <>
          <div className="results-container">
            {searchResults.map((item, index) => (
              <div key={index}>
                <RecipeCard
                  item={item}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  source={currentSource}
                />
              </div>
            ))}
          </div>
          <RecipeModal isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </div>
  );
};

export default RecipeSearch;
