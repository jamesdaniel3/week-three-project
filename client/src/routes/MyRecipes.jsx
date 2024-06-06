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
    ModalCloseButton,
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
    ButtonGroup,
    Heading,
    Divider,
    Center,
    Box,
    Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../styles/Index.css";
import { getAuth } from "firebase/auth"; 

function MyRecipes() {
    const auth = getAuth();
    const user_id = auth.currentUser.uid;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [userRecipes, setUserRecipes] = useState([]);
    const [savedEdamamRecipes, setSavedEdamamRecipes] = useState([]);
    const [savedOtherAuthorRecipes, setSavedOtherAuthorRecipes] = useState([]);
    const [allSavedRecipes, setAllSavedRecipes] = useState([]);
    const [displayRecipes, setDisplayRecipes] = useState([]);

    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/recipefirebase/user-created-recipes${user_id}`
                );
                console.log(resposne);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleOpenModal = (recipe) => {
        setSelectedRecipe(recipe);
        onOpen();
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
                    <Flex
                        alignContent={"center"}
                        justifyContent={"center"}
                    >
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
                                <option selected hidden disabled value="">
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
                            <div key={item.recipe.uri}>
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
                                            src={item.recipe.images.SMALL.url}
                                            width="100%"
                                            height="8em"
                                            objectFit="cover"
                                            borderTopRadius="15"
                                            onClick={() =>
                                                handleOpenModal(item.recipe)
                                            }
                                        />
                                        <Box padding="0.5em">
                                            <Text textAlign="center">
                                                {item.recipe.label.length > 50
                                                    ? `${item.recipe.label.slice(
                                                          0,
                                                          50
                                                      )}...`
                                                    : item.recipe.label}
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
                                                {selectedRecipe.label}
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
                                                    {item.recipe.ingredientLines.join(
                                                        ",  "
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
                                                    {item.recipe.yield}
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
                                                        item.recipe.calories /
                                                        item.recipe.yield
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
