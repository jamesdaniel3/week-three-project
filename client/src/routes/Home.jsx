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
    const arr = ["name", "name", "name", "name", "name"];
    const [randomRecipes, setRandomRecipes] = useState([]);

    const isWithinTimeRange = (startHour, endHour) => {
        return currentHour >= startHour && currentHour < endHour;
    };

    useEffect(() => {
        // const now = new Date();
        // const currentHour = now.getHours();
        // const isMorning = isWithinTimeRange(0, 11);
        // const isAfternoon = isWithinTimeRange(11, 15);
        // const isEvening = isWithinTimeRange(15, 24);

        const fetchData = async () => {

            // if(isMorning) {

            // }
            // if (isAfternoon) {
            // }
            // if (isEvening) {
            // }
            // else {
            const response = await axios.get(
                "http://localhost:8888/edamam/recipesearch",
                { params: { diet: "balanced" } }

            );
            setRandomRecipes(response.data.hits);
            console.log(response.data.hits);
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
                                    marginRight="5px"
                                    onClick={onOpen}
                                >
                                    <CardBody>
                                        <Image
                                            src={item.recipe.images.SMALL.url}
                                            width="100%"
                                            height="8em" // Set a fixed height for the image
                                            objectFit="cover" // Maintain aspect ratio while filling the specified height
                                            borderTopRadius="15"
                                            onClick={onOpen}
                                        />
                                        <Box padding="0.5em">
                                            <Text textAlign="center">
                                                {item.recipe.label.length > 55
                                                    ? `${item.recipe.label.slice(
                                                          0,
                                                          55
                                                      )}...`
                                                    : item.recipe.label}
                                            </Text>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                         <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        borderRadius="20px"
                    >
                        <ModalOverlay
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                backdropFilter: "blur(2px)",
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
                                        position: "absolute", // Add this line
                                        bottom: ".9rem", // Add this line
                                        left: ".5rem", // Add this line
                                    }}
                                >
                                    Calories/serving:
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Link to="/find-recipes">
                                    <button
                                        style={{
                                            backgroundColor: "#55423D",
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
                   
                </div>
            </div>
        </>
    );
}

export default Home;
