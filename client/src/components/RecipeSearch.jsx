import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    CardBody,
    Text,
    Image,
} from "@chakra-ui/react";
import '../styles/RecipeSearch.css';
import img from "../assets/zdz9mr_blackBear.png";
import { Link } from "react-router-dom";

const RecipeSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

//   useEffect( () => {
//     const fetchData = async () => {
//       const response = await axios.get('http://localhost:8888/edamam/recipesearch', { params: {diet: "balanced"}});
//     setSearchResults(response.data.hits);  
//     console.log(response.data);
//     }
//     fetchData();
//   },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    if (!query) return;

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8888/edamam/recipesearch', {
        params: { q: query }
      });
      setSearchResults(response.data.hits);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="search-bar">
        <form id="input-form" onSubmit={handleSubmit}>
          <input type="text" name="query" className="text-input" placeholder="Search for a recipe..." />
          <button className={"search-button"} type="submit">Search</button>
        </form>
      </div>
      {loading && <p>Loading...</p>}
      <div className="results-container">
        {searchResults.map((item) => (
          <div key={item.recipe.label}>
            <Card
              bg="#EADDCF"
              width="12em"
              height="10em"
              borderRadius="15"
              marginTop="30px"
              marginRight="5px"
              onClick={onOpen}
            >
              <CardBody>
                <Image
                  src={item.recipe.images.SMALL.url}
                  width="100%"
                  height="55%"
                  borderTopRadius="15"
                />
                <Text marginLeft="15px">{item.recipe.label}</Text>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
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
  );
};

export default RecipeSearch;
