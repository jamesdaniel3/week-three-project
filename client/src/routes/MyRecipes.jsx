import NavBar from "../components/Navbar.jsx";
import React, { useState, useEffect } from "react";
import "../styles/MyRecipes.css";
import axios from "axios";
import {
    Flex,
    Center,
    Select,
    CardBody,
    Card,
    Box,
    Text,
    Image,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader, ModalBody, ModalFooter,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import "../styles/Index.css";
import genericFoodImage from "../assets/genericFood.png";
import {Link} from "react-router-dom";

/*
    The goal of this page is to give users the options to display recipes that fall into the following categories:
        - Recipes the user created
        - Recipes the user favorited
        - Recipes the user favorited from Edamam
        - Recipes the user favorited from other users
    The displayed recipe cards should have the same functionality as the home page

    take list of created and list of favorites: other users == favorites - created
    take list of favorites: edamam == favorites not userCreated
 */

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
        console.log(recipe)
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
                    <Center>
                        <Select
                            bg="#EADDCF"
                            className="select"
                            style={{
                                paddingInlineEnd: "0px",
                                borderRadius: "1rem",
                                color: "#140d0b",
                                fontSize: "1rem",
                                textAlign: "center",
                            }}
                            icon=""
                            value={selectedValue}
                            onChange={handleChange}
                        >
                            <option hidden disabled value="">
                                Filter recipes
                            </option>
                            <option value="userCreated">
                                Your created recipes
                            </option>
                            <option value="edamamCreated">
                                Your favorited Edamam recipes
                            </option>
                            <option value="otherUserCreated">
                                Your favorited recipes from other users
                            </option>
                            <option value="allSaved">
                                All favorited recipes
                            </option>
                        </Select>
                    </Center>
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
                            <Card
                                bg="#EADDCF"
                                width="14em"
                                height="12em"
                                borderRadius="15"
                                marginTop="30px"
                                marginRight="1em"
                                onClick={() => handleOpenModal(item)}
                            >
                                <CardBody>
                                    <Image
                                        src={genericFoodImage}
                                        width="100%"
                                        height="8em"
                                        objectFit="cover"
                                        borderTopRadius="15"
                                        onClick={() =>
                                            handleOpenModal(item)
                                        }
                                    />
                                    <Box padding="0.5em">
                                        <Text textAlign="center">
                                            {item.name.length > 50
                                                ? `${item.name.slice(
                                                    0,
                                                    50
                                                )}...`
                                                : item.name}
                                        </Text>
                                    </Box>
                                </CardBody>
                            </Card>
                            {selectedRecipe && (
                                <Modal
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    borderRadius="20px"
                                >
                                    <ModalOverlay
                                        style={{
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.02)",
                                        }}
                                    />
                                    <ModalContent
                                        marginTop="20%"
                                        marginLeft="36%"
                                        width="400px"
                                        height="300px"
                                        bg="#EADDCF"
                                        borderRadius="20px"
                                    >
                                        <ModalHeader
                                            textAlign="center"
                                            color="55423D"
                                            marginTop=".3em"
                                            fontSize="1.5em"
                                        >
                                            {selectedRecipe.name}
                                        </ModalHeader>
                                        <ModalBody marginLeft="1em">
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "5rem",
                                                    left: ".5rem",
                                                    paddingLeft: ".1rem",
                                                    paddingRight: ".1rem",
                                                }}
                                            >
                                                Ingredients:{"   "}
                                                {selectedRecipe.userCreated
                                                    ? selectedRecipe.ingredients.map(
                                                        (ingredient) => (
                                                            <div
                                                                key={
                                                                    ingredient.name
                                                                }
                                                            >
                                                                <p>
                                                                    {
                                                                        ingredient.amount
                                                                    }{" "}
                                                                    {
                                                                        ingredient.units
                                                                    }{" "}
                                                                    {
                                                                        ingredient.name
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    )
                                                    : selectedRecipe.ingredients.map(
                                                        (
                                                            ingredientLine,
                                                            index
                                                        ) => (
                                                            <div
                                                                key={
                                                                    index
                                                                }
                                                            >
                                                                <p>
                                                                    {
                                                                        ingredientLine.text
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                            <br />
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: "2.5rem",
                                                    left: ".5rem",
                                                }}
                                            >
                                                Servings:{" "}
                                                {selectedRecipe.servings}
                                            </div>
                                            <br />
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: ".9rem",
                                                    left: ".5rem",
                                                }}
                                            >
                                                Calories/serving:{" "}
                                                {(
                                                    selectedRecipe.calories /
                                                    selectedRecipe.servings
                                                ).toFixed(2)}
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Link to={selectedRecipe.userCreated ? `/recipe/${selectedRecipe.id}/firebase` : `/recipe/${selectedRecipe.id}/edamam`}>
                                                <button
                                                    style={{
                                                        backgroundColor:
                                                            "#55423D",
                                                        color: "#EADDCF",
                                                        borderRadius: "1em",
                                                        height: "2em",
                                                        width: "9em",
                                                        border: "none",
                                                        position:
                                                            "absolute",
                                                        bottom: ".6rem",
                                                        right: ".5rem",
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems:
                                                            "center",
                                                    }}
                                                >
                                                    See full recipe
                                                </button>
                                            </Link>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MyRecipes;
