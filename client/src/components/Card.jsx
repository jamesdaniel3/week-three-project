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
import img from "../assets/genericFood.png";
export default function RecipeCard({ item, isOpen, onOpen, onClose, source }) {
  return (
    <>
      {source === "edamam" ? (
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
              height="8em"
              objectFit="cover"
              borderTopRadius="15"
              onClick={onOpen}
            />
            <Box padding="0.5em">
              <Text textAlign="center">
                {item.recipe.label.length > 55
                  ? `${item.recipe.label.slice(0, 55)}...`
                  : item.recipe.label}
              </Text>
            </Box>
          </CardBody>
        </Card>
      ) : (
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
              src={img}
              width="100%"
              height="8em"
              objectFit="cover"
              borderTopRadius="15"
              onClick={onOpen}
            />
            <Box padding="0.5em">
              <Text textAlign="center">
                {item.name > 55
                  ? `${item.name.slice(0, 55)}...`
                  : item.name}
              </Text>
            </Box>
          </CardBody>
        </Card>
      )}
    </>
  );
}
