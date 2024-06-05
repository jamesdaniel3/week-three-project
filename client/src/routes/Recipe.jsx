import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/Navbar.jsx";
import RecipeDisplay from "../components/RecipeDisplay.jsx";
import "../styles/Index.css";
import { useParams } from "react-router-dom";

function Recipe() {
    const { id, location } = useParams();
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            if (location === "edamam") {
                try {
                    const response = await axios.get(`http://localhost:8888/edamam/by-id`, {
                        params: { id }
                    });
                    const info = response.data.recipe;
                    console.log(info);

                    // Transform the info object into the desired recipe format
                    const transformedRecipe = {
                        calories: Math.round(info.calories / info.yield),
                        glutenFree: info.healthLabels.includes("Gluten-Free"),
                        vegetarian: info.healthLabels.includes("Vegetarian"),
                        name: info.label,
                        servings: info.yield,
                        instructionsLink: info.url,
                        instructions: [],
                        ingredients: info.ingredients.map(item => ({
                            name: item.food,
                            amount: item.quantity,
                            unit: item.measure,
                            text: item.text,
                        })),
                        additionalNotes: "",
                        status: "OLD",
                        userCreated: false
                    };

                    setRecipe(transformedRecipe);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('An error occurred while fetching data');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchRecipe();
    }, [id, location]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className={"container"}>
                <NavBar />
                <div className="content">
                    {recipe ? <RecipeDisplay recipe={recipe} /> : <div>No recipe found</div>}
                </div>
            </div>
        </>
    );
}

export default Recipe;
