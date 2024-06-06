import NavBar from "../components/Navbar.jsx";
import React, { useState, useEffect } from "react";
import "../styles/MyRecipes.css";
import axios from "axios";
import {Flex, useDisclosure} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import "../styles/Index.css";
import RecipeFilter from "../components/RecipeFilter";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";

function MyRecipes() {
    const auth = getAuth();
    const user_id = auth.currentUser.uid;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [createdRecipes, setCreatedRecipes] = useState([]);
    const [favoriteRecipesFromOtherUsers, setFavoriteRecipesFromOtherUsers] = useState([]);
    const [favoriteRecipesFromEdamam, setFavoriteRecipesFromEdamam] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [currentlyDisplayedRecipes, setCurrentlyDisplayedRecipes] = useState([]);

    useEffect(() => {
        const fetchFavoritedRecipes = async () => {
            try {
                const responseFavorites = await axios.get(
                    "http://localhost:8888/recipefirebase/user-favorited-recipes",
                    {
                        params: { user_id },
                    }
                );
                const responseCreated = await axios.get(
                    "http://localhost:8888/recipefirebase/user-created-recipes",
                    {
                        params: { user_id },
                    }
                );
                setCreatedRecipes(responseCreated.data);
                setFavoriteRecipes(responseFavorites.data);
                setFavoriteRecipesFromOtherUsers(getFavoritesFromOtherUsers(responseCreated.data, responseFavorites.data));
                setFavoriteRecipesFromEdamam(getFavoritesFromEdamam(responseFavorites.data));
            } catch (error) {
                console.error("Error fetching favorited recipes:", error);
            }
        };

        fetchFavoritedRecipes();
    }, [user_id]);

    function getFavoritesFromOtherUsers(userCreated, userFavorited) {
        const ids = new Set(userCreated.map(item => item.id));
        return userFavorited.filter(item => !ids.has(item.id) && item.userCreated !== false);
    }

    function getFavoritesFromEdamam(userFavorited) {
        return userFavorited.filter(item => item.userCreated === false);
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        value === "userCreated"
            ? setCurrentlyDisplayedRecipes(createdRecipes)
            : value === "edamamCreated"
                ? setCurrentlyDisplayedRecipes(favoriteRecipesFromEdamam)
                : value === "otherUserCreated"
                    ? setCurrentlyDisplayedRecipes(favoriteRecipesFromOtherUsers)
                    : value === "allSaved"
                        ? setCurrentlyDisplayedRecipes(favoriteRecipes)
                        : setCurrentlyDisplayedRecipes(favoriteRecipes);
    };

    function handleOpenModal(recipe){
        setSelectedRecipe(recipe);
        onOpen();
    }

    return (
        <>
            <NavBar />
            <div className="content">
                <h1>Cheffed</h1>
                <h6>Your recipe library</h6>
                <br />
                <Flex alignContent={"center"} justifyContent={"center"}>
                    <RecipeFilter selectedValue={selectedValue} handleChange={handleChange} />
                </Flex>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "1em",
                        justifyContent: "center",
                    }}
                >
                    {currentlyDisplayedRecipes.map((item) => (
                        <div key={item.name}>
                            <RecipeCard item={item} handleOpenModal={handleOpenModal} />
                            {selectedRecipe && (
                                <RecipeModal
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    selectedRecipe={selectedRecipe}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MyRecipes;
