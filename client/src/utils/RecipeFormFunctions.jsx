import axios from "axios";
import { getAuth } from "firebase/auth";

export const handleChange = (e, setFormData) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
    }));
};

export const handleInstructionChange = (index, e, formData, setFormData) => {
    const { value } = e.target;
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData((prevData) => ({
        ...prevData,
        instructions: newInstructions,
    }));
};

export const addInstruction = (setFormData) => {
    setFormData((prevData) => ({
        ...prevData,
        instructions: [...prevData.instructions, ""],
    }));
};

export const removeInstruction = (index, formData, setFormData) => {
    const newInstructions = formData.instructions.filter((_, i) => i !== index);
    setFormData((prevData) => ({
        ...prevData,
        instructions: newInstructions,
    }));
};

export const handleIngredientChange = (e, index, setFormData, formData) => {
    const { name, value } = e.target;
    const ingredients = [...formData.ingredients];
    ingredients[index] = { ...ingredients[index], [name]: value };
    setFormData({ ...formData, ingredients });
};

export const addIngredient = (setFormData, formData) => {
    const ingredients = [...formData.ingredients, { name: "", amount: "", unit: "" }];
    setFormData({ ...formData, ingredients });
};

export const removeIngredient = (index, setFormData, formData) => {
    const ingredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients });
};

export const handleSubmit = (e, formData) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;
    formData["user_uid"] = user.uid;

    axios.post('http://localhost:8888/recipefirebase/create-recipe', formData)
        .then(response => {
            console.log('Recipe created successfully:', response.data);
        })
        .catch(error => {
            console.error('Error creating recipe:', error);
        });
};
