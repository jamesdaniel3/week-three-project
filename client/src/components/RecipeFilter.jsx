import React from "react";
import { Center, Select } from "@chakra-ui/react";

const RecipeFilter = ({ selectedValue, handleChange }) => {
    return (
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
    );
};

export default RecipeFilter;
