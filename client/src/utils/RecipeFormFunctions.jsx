import axios from "axios";

export const handleChange = (e, setFormData) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
    }));
};

export const handleIngredientChange = (index, e, formData, setFormData) => {
    const { name, value } = e.target;
    const newIngredients = [...formData.ingredients];
    newIngredients[index][name] = value;
    setFormData((prevData) => ({
        ...prevData,
        ingredients: newIngredients,
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

export const addIngredient = (setFormData) => {
    setFormData((prevData) => ({
        ...prevData,
        ingredients: [...prevData.ingredients, { name: "", amount: "", unit: "" }],
    }));
};

export const removeIngredient = (index, formData, setFormData) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData((prevData) => ({
        ...prevData,
        ingredients: newIngredients,
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

export const handleSubmit = (e, formData) => {
    e.preventDefault();
    console.log(formData)
    axios.post('http://localhost:8888/recipefirebase/create-recipe', formData)
        .then(response => {
            console.log('Recipe created successfully:', response.data);
        })
        .catch(error => {
            console.error('Error creating recipe:', error);
        });
};
