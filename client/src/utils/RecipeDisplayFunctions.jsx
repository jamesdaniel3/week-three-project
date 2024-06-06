import axios from "axios";

export const checkIfFavorited = async (user_id, recipe_id) => {
    try {
        const response = await axios.get('http://localhost:8888/recipefirebase/is-favorited', {
            params: { user_id, recipe_id }
        });
        return response.data.isFavorited;
    } catch (error) {
        console.error('Error checking if recipe is favorited:', error);
        throw error;
    }
};

export const addFavorite = async (user_id, recipe_id, recipe) => {
    try {
        const response = await axios.put('http://localhost:8888/recipefirebase/add-favorite', {
            user_id: user_id,
            recipe_id: recipe_id,
            recipe: recipe
        });
        console.log(response.data.message);
        return true;
    } catch (error) {
        console.error('Error adding recipe to favorites:', error);
        throw error;
    }
};

export const removeFavorite = async (user_id, recipe_id) => {
    try {
        const response = await axios.put('http://localhost:8888/recipefirebase/remove-favorite', {
            user_id: user_id,
            recipe_id: recipe_id
        });
        console.log(response.data.message);
        return true;
    } catch (error) {
        console.error('Error removing recipe from favorites:', error);
        throw error;
    }
};
