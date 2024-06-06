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
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} borderRadius="20px">
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
                                position: "absolute",
                                bottom: ".9rem",
                                left: ".5rem",
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
        </>
    )}
