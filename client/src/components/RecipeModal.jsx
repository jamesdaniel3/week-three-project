import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const RecipeModal = ({ isOpen, onClose, selectedRecipe }) => {
    return (
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
                            ? selectedRecipe.ingredients.map((ingredient) => (
                                <div key={ingredient.name}>
                                    <p>
                                        {ingredient.amount} {ingredient.units}{" "}
                                        {ingredient.name}
                                    </p>
                                </div>
                            ))
                            : selectedRecipe.ingredients.map(
                                (ingredientLine, index) => (
                                    <div key={index}>
                                        <p>{ingredientLine.text}</p>
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
                        Servings: {selectedRecipe.servings}
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
                        to={
                            selectedRecipe.userCreated
                                ? `/recipe/${selectedRecipe.id}/firebase`
                                : `/recipe/${selectedRecipe.id}/edamam`
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
    );
};

export default RecipeModal;
