import NavBar from "../components/Navbar.jsx";
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
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
    ButtonGroup,
    Heading,
    Divider,
    Center,
    Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import img from "../assets/zdz9mr_blackBear.png";

function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [randomRecipes, setRandomRecipes] = useState([]);
    const [meal, setMealType] = useState("breakfast");

useEffect(() => {
    const fetchData = async () => {
        const now = new Date();
        const currentHour = now.getHours();

        const isWithinTimeRange = (startHour, endHour) => {
            return currentHour >= startHour && currentHour < endHour;
        };

        const isMorning = isWithinTimeRange(5, 10);
        const isAfternoon = isWithinTimeRange(10, 13);
        const isEvening = isWithinTimeRange(13, 21);

        if (isMorning) {
            setMealType("breakfast");
        } else if (isAfternoon) {
             setMealType("brunch");
        } else if (isEvening) {
            setMealType("lunch/dinner");
        } else {
             setMealType("snack");
        }

        try {
            const response = await axios.get(
                "http://localhost:8888/edamam/recipesearch",
                {
                    params: { mealType: meal },
                }
            );
            setRandomRecipes(response.data.hits);
            console.log(response.data.hits);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, []);

    return (
        <>
            <div>
                <NavBar />
                <div className="content">
                    <h1>Cheffed</h1>
                    <h3>Your digital cookbook</h3>
                    <br />
                    <h6>Here are our suggestions for {meal}</h6>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "1em",
                            justifyContent: "center",
                        }}
                    >
                        {randomRecipes.map((item) => (
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
                                            onClick={onOpen}
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
                                <Modal
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    borderRadius="20px"
                                >
                                    <ModalOverlay
                                        style={{
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.02)",
                                            // backdropFilter: "blur(1px)",
                                        }}
                                    />
                                    <ModalContent
                                        marginTop="20%"
                                        marginLeft="36%"
                                        width="400px"
                                        height="200px"
                                        bg="#EADDCF"
                                        borderRadius="20px"
                                    >
                                        <ModalHeader
                                            textAlign="center"
                                            color="55423D"
                                            fontSize="2em"
                                        >
                                            Recipe name
                                        </ModalHeader>
                                        <ModalBody marginLeft="1em">
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "2.5rem",
                                                    left: ".5rem", 
                                                }}
                                            >
                                                Ingredients:{" "}
                                            </div>
                                            <br />
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: "2.5rem",
                                                    left: ".5rem",
                                                }}
                                            >
                                                Servings:
                                            </div>
                                            <br />
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: ".9rem",
                                                    left: ".5rem",
                                                }}
                                            >
                                                Calories/serving:
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            
                                            <Link to={`/recipe/${item.recipe.uri.split("recipe_")[1]}/edamam`}>
                                                <button
                                                    style={{
                                                        backgroundColor:
                                                            "#55423D",
                                                        color: "#EADDCF",
                                                        borderRadius: "1em",
                                                        height: "2em",
                                                        width: "7em",
                                                        border: "none",
                                                        position: "absolute",
                                                        bottom: ".6rem",
                                                        right: ".5rem",
                                                    }}
                                                >
                                                    See full recipe
                                                </button>
                                            </Link>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
