import React, { useState } from "react";
import "../styles/RecipeForm.css";
import "../styles/Index.css";

export default function RecipeForm() {
    const [formData, setFormData] = useState({
        name: "",
        ingredients: [{ name: "", amount: "", unit: "" }],
        instructions: [""],
        glutenFree: false,
        vegetarian: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;
        const newIngredients = [...formData.ingredients];
        newIngredients[index][name] = value;
        setFormData((prevData) => ({
            ...prevData,
            ingredients: newIngredients,
        }));
    };

    const handleInstructionChange = (index, e) => {
        const { value } = e.target;
        const newInstructions = [...formData.instructions];
        newInstructions[index] = value;
        setFormData((prevData) => ({
            ...prevData,
            instructions: newInstructions,
        }));
    };

    const addIngredient = () => {
        setFormData((prevData) => ({
            ...prevData,
            ingredients: [...prevData.ingredients, { name: "", amount: "", unit: "" }],
        }));
    };

    const removeIngredient = (index) => {
        const newIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            ingredients: newIngredients,
        }));
    };

    const addInstruction = () => {
        setFormData((prevData) => ({
            ...prevData,
            instructions: [...prevData.instructions, ""],
        }));
    };

    const removeInstruction = (index) => {
        const newInstructions = formData.instructions.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            instructions: newInstructions,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="recipe-page">
            <div className="recipe-title">Create a Recipe</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="section-header">
                        Name
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>
                    <div className="section-header">Ingredients</div>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="ingredient-row">
                            <input
                                type="text"
                                name="name"
                                placeholder="Ingredient Name"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, e)}
                                className="input-field"
                            />
                            <input
                                type="text"
                                name="amount"
                                placeholder="Amount"
                                value={ingredient.amount}
                                onChange={(e) => handleIngredientChange(index, e)}
                                className="input-field"
                            />
                            <select
                                name="unit"
                                value={ingredient.unit}
                                onChange={(e) => handleIngredientChange(index, e)}
                                className="input-field"
                            >
                                <option value="">Select Unit</option>
                                <option value="ounces">Ounces</option>
                                <option value="grams">Grams</option>
                                <option value="pints">Pints</option>
                            </select>
                            <button
                                type="button"
                                className="remove-button"
                                onClick={() => removeIngredient(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient} className="add-button">
                        +
                    </button>
                    <div className="section-header">Instructions</div>
                    {formData.instructions.map((instruction, index) => (
                        <div key={index} className="instruction-row">
                            <span className="instruction-number">{index + 1}</span>
                            <textarea
                                name="instruction"
                                placeholder="Instruction"
                                value={instruction}
                                onChange={(e) => handleInstructionChange(index, e)}
                                className="instruction-field"
                            />
                            <button
                                type="button"
                                className="remove-button"
                                onClick={() => removeInstruction(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addInstruction} className="add-button">
                        +
                    </button>
                    <div className="section-header">Dietary Notes</div>
                    <div className="checkbox-container">
                        <label>
                            <input
                                type="checkbox"
                                name="glutenFree"
                                checked={formData.glutenFree}
                                onChange={handleChange}
                                className="checkbox"
                            />
                            This dish is gluten free
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="vegetarian"
                                checked={formData.vegetarian}
                                onChange={handleChange}
                                className="checkbox"
                            />
                            This dish is vegetarian
                        </label>
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}