import NavBar from "../components/Navbar.jsx";
import React, { useState, useEffect } from "react";
import "../styles/MyRecipes.css";
import axios from "axios";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    Image,
    Stack,
    Flex,
    Center,
    Box,
    Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../styles/Index.css";
import { getAuth } from "firebase/auth";
import genericFoodImage from "../assets/genericFood.png";

function MyRecipes() {
    const auth = getAuth();
    const user_id = auth.currentUser.uid;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [userRecipes, setUserRecipes] = useState([]);
    const [savedEdamamRecipes, setSavedEdamamRecipes] = useState([]);
    const [savedOtherAuthorRecipes, setSavedOtherAuthorRecipes] = useState([]);
    const [allSavedRecipes, setAllSavedRecipes] = useState([]);

    const [selectedValue, setSelectedValue] = useState("");

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
                setAllSavedRecipes(responseFavorites.data);
                setUserRecipes(responseCreated.data);
                //setAllSavedRecipes(allSavedRecipes.concat(userRecipes));
            } catch (error) {
                console.error("Error fetching favorited recipes:", error);
            }
        };

        fetchFavoritedRecipes();
        findEdamamRecipes();
        findOtherAuthorRecipes();
    }, [user_id]);

    const [displayRecipes, setDisplayRecipes] = useState(allSavedRecipes); // needs to be here instead of with other use states bc must wait to fetch recipes before setting displayRecipes

    const handleOpenModal = (recipe) => {
        setSelectedRecipe(recipe);
        onOpen();
    };

    const findEdamamRecipes = () => {
        const filteredList = allSavedRecipes.filter(
            (item) => !item.userCreated
        );
        setSavedEdamamRecipes(filteredList);
    };

    const findOtherAuthorRecipes = () => {
        const filteredList = allSavedRecipes.filter(
            (item1) =>
                item1.userCreated &&
                userRecipes.every((item2) => item2.docID !== item1.docID)
        );
        setSavedOtherAuthorRecipes(filteredList);
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        selectedValue === "userCreated"
            ? setDisplayRecipes(userRecipes)
            : selectedValue === "edamamCreated"
            ? setDisplayRecipes(savedEdamamRecipes)
            : selectedValue === "otherUserCreated"
            ? setDisplayRecipes(savedOtherAuthorRecipes)
            : setDisplayRecipes(allSavedRecipes);
    };

    return (
        <>
            <div>
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
                                <option selected hidden disabled value = "">
                                    Filter recipes
                                </option>
                                <option value="userCreated">
                                    Your created recipes
                                </option>
                                <option value="edamamCreated">
                                    Your saved Edamam recipes
                                </option>
                                <option value="otherUserCreated">
                                    Your saved recipes created by other users
                                </option>
                                <option value="allSaved">
                                    All saved recipes
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
                        {displayRecipes.map((item) => (
                            <div key={item.name}>
                                <Card
                                    bg="#EADDCF"
                                    width="14em"
                                    height="12em"
                                    borderRadius="15"
                                    marginTop="30px"
                                    marginRight="1em"
                                    onClick={onOpen}
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
                                                    ? `${item.name.length.slice(
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
                                                                  <div key={ingredient.name}>
                                                                      <p>
                                                                          {ingredient.amount}{" "}
                                                                          {ingredient.units}{" "}
                                                                          {ingredient.name}
                                                                      </p>
                                                                  </div>
                                                              )
                                                          )
                                                        : selectedRecipe.ingredients.map(
                                                              (ingredientLine,
                                                                  index
                                                              ) => (
                                                                  <div key={index}>
                                                                      <p>
                                                                          {ingredientLine.text}
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
                                                <Link
                                                    to={`/recipe/${
                                                        selectedRecipe.uri.split(
                                                            "#recipe_"
                                                        )[1]
                                                    }/edamam`}
                                                >
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
            </div>
        </>
    );
}

export default MyRecipes;
