import React from "react";
import { Card, CardBody, Box, Text, Image } from "@chakra-ui/react";
import genericFoodImage from "../assets/genericFood.png";

const RecipeCard = ({ item, handleOpenModal }) => {
    return (
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
                    onClick={() => handleOpenModal(item)}
                />
                <Box padding="0.5em">
                    <Text textAlign="center">
                        {item.name.length > 50
                            ? `${item.name.slice(0, 50)}...`
                            : item.name}
                    </Text>
                </Box>
            </CardBody>
        </Card>
    );
};

export default RecipeCard;
