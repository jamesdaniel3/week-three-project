import React, {useEffect, useState} from "react";
import "../styles/RecipeForm.css";
import "../styles/Index.css";
import {
    handleChange,
    handleSubmit,
    handleIngredientChange,
    handleInstructionChange,
    addIngredient,
    removeIngredient,
    addInstruction,
    removeInstruction,
} from "../utils/RecipeFormFunctions";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormData = {
    name: "",
    servings: "",
    calories: "",
    ingredients: [{ name: "", amount: "", unit: "" }],
    instructions: [""],
    glutenFree: false,
    vegetarian: false,
    instructionsType: "write",
    instructionsLink: "",
    status: "NEW",
    additionalNotes: "",
    userCreated: true,
};

export default function RecipeForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [recipeSubmitted, setRecipeSubmitted] = useState(false);

    const handleFormSubmit = (e) => {
        handleSubmit(e, formData);
        // Create a deep copy of initialFormData to reset the form
        setFormData(JSON.parse(JSON.stringify(initialFormData)));
        setRecipeSubmitted(true);
    };

    useEffect(() => {
        if (recipeSubmitted) {
            toast.success("Recipe Submitted!");
            setRecipeSubmitted(false);
        }
    }, [recipeSubmitted]);

    return (
        <div className="recipe-page">
            <div className="recipe-title">Create a Recipe</div>
            <div className="form-container">
                <form onSubmit={handleFormSubmit}>
                    <div className="form-floating">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange(e, setFormData)}
                            className="input-field"
                            required
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="number"
                            id="servings"
                            name="servings"
                            value={formData.servings}
                            onChange={(e) => handleChange(e, setFormData)}
                            className="input-field"
                            min={0}
                            step={0.25}
                        />
                        <label htmlFor="servings">Servings</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="number"
                            id="calories"
                            name="calories"
                            value={formData.calories}
                            onChange={(e) => handleChange(e, setFormData)}
                            className="input-field"
                            min={0}
                        />
                        <label htmlFor="calories">Calories per serving</label>
                    </div>
                    <div className="section-header">Ingredients</div>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="ingredient-row">
                            <input
                                type="text"
                                name="name"
                                placeholder="Ingredient Name"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(e, index, setFormData, formData)}
                                className="input-field"
                            />
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                value={ingredient.amount}
                                onChange={(e) => handleIngredientChange(e, index, setFormData, formData)}
                                className="input-field"
                                min={0}
                                step={0.25}
                            />
                            <select
                                name="unit"
                                value={ingredient.unit}
                                onChange={(e) => handleIngredientChange(e, index, setFormData, formData)}
                                className="input-field"
                            >
                                <option value="">Select Unit</option>
                                <option value="cups">Cups</option>
                                <option value="gallons">Gallons</option>
                                <option value="grams">Grams</option>
                                <option value="liters">Liters</option>
                                <option value="ounces">Ounces</option>
                                <option value="pinches">Pinches</option>
                                <option value="pints">Pints</option>
                                <option value="pounds">Pounds</option>
                                <option value="tablespoons">Tablespoons</option>
                                <option value="teaspoons">Teaspoons</option>
                                <option value="quarts">Quarts</option>
                            </select>
                            <button
                                type="button"
                                className="remove-button"
                                onClick={() => removeIngredient(index, setFormData, formData)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addIngredient(setFormData, formData)} className="new-row-button">
                        +
                    </button>
                    <div className="section-header">Instructions</div>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="write"
                            name="instructionsType"
                            value="write"
                            checked={formData.instructionsType === "write"}
                            onChange={(e) => handleChange(e, setFormData)}
                            className="radio-input"
                        />
                        <label htmlFor="write" className="radio-label">Write your Own</label>
                        <input
                            type="radio"
                            id="link"
                            name="instructionsType"
                            value="link"
                            checked={formData.instructionsType === "link"}
                            onChange={(e) => handleChange(e, setFormData)}
                            className="radio-input"
                        />
                        <label htmlFor="link" className="radio-label">Link a Website</label>
                    </div>
                    {formData.instructionsType === "write" ? (
                        formData.instructions.map((instruction, index) => (
                            <div key={index} className="instruction-row">
                                <span className="instruction-number">{index + 1}</span>
                                <textarea
                                    name="instruction"
                                    placeholder="Instruction"
                                    value={instruction}
                                    onChange={(e) => handleInstructionChange(index, e, formData, setFormData)}
                                    className="instruction-field"
                                />
                                <button
                                    type="button"
                                    className="remove-button"
                                    onClick={() => removeInstruction(index, formData, setFormData)}
                                >
                                    X
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="instruction-row">
                            <input
                                type="text"
                                name="instructionsLink"
                                placeholder="Website Link"
                                value={formData.instructionsLink}
                                onChange={(e) => handleChange(e, setFormData)}
                                className="input-field"
                            />
                        </div>
                    )}
                    {formData.instructionsType === "write" && (
                        <button type="button" onClick={() => addInstruction(setFormData)} className="new-row-button">
                            +
                        </button>
                    )}
                    <div className="section-header">Dietary Notes</div>
                    <div className="checkbox-container">
                        <label className={"dietary-label"}>
                            <input
                                type="checkbox"
                                name="glutenFree"
                                checked={formData.glutenFree}
                                onChange={(e) => handleChange(e, setFormData)}
                                className="checkbox"
                            />
                            This dish is gluten free
                        </label>
                        <label className={"dietary-label"}>
                            <input
                                type="checkbox"
                                name="vegetarian"
                                checked={formData.vegetarian}
                                onChange={(e) => handleChange(e, setFormData)}
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
            <ToastContainer style={{ zIndex: 9999 }} />
        </div>
    );
}
