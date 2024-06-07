import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
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

export default function RecipeModal({item, isOpen, onClose}) {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    return (
        <>
            {selectedRecipe && (
                <Modal isOpen={isOpen} onClose={onClose} borderRadius="20px">
                    <ModalOverlay
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.02)",
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
                                {selectedRecipe.ingredientLines.join(",  ")}
                            </div>
                            <br />
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "2.5rem",
                                    left: ".5rem",
                                }}
                            >
                                Servings: {selectedRecipe.yield}
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
                                    selectedRecipe.yield
                                ).toFixed(2)}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Link
                                to={`/recipe/${
                                    selectedRecipe.uri.split("#recipe_")[1]
                                }/edamam`}
                            >
                                <button
                                    style={{
                                        backgroundColor: "#55423D",
                                        color: "#EADDCF",
                                        borderRadius: "1em",
                                        height: "2em",
                                        width: "9em",
                                        border: "none",
                                        position: "absolute",
                                        bottom: ".6rem",
                                        right: ".5rem",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    See full recipe
                                </button>
                            </Link>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    );}
