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

export default function RecipeModal({
  isOpen,
  onClose,
  source,
  selectedRecipe,
}) {
  return (
    <>
      {selectedRecipe && (
        <>
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
                    {!selectedRecipe.uri?  selectedRecipe.name :  selectedRecipe.label }
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
                        {!selectedRecipe.uri
                            ? 
                            <ul style={{marginLeft: "1.5rem"}}>
                            {selectedRecipe.ingredients.map((ingredient) => (
                                <li key={ingredient.name}>
                                   
                                        {ingredient.amount} {ingredient.units}{" "}
                                        {ingredient.name}
                                   
                                </li>
                            ))}
                            </ul>
                            :                             
                            <ul style={{marginLeft: "1.5rem"}}>
                            {selectedRecipe.ingredientLines.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>}
                    </div>
                    <br />
                    <div
                        style={{
                            position: "absolute",
                            bottom: "2.5rem",
                            left: ".5rem",
                        }}
                    >
                        Servings: {!selectedRecipe.uri?  selectedRecipe.servings :  selectedRecipe.yield }
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
                        {!selectedRecipe.uri? selectedRecipe.calories : (
                            selectedRecipe.calories /
                            selectedRecipe.yield
                        ).toFixed(2) }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Link
                        to={
                            !selectedRecipe.uri
                                ? `/recipe/${selectedRecipe.id}/firebase`
                                : `/recipe/${selectedRecipe.uri.split("#recipe_")[1]}/edamam`
                        }
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
        </>
      )}
    </>
  );
}
