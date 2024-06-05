import "../styles/Index.css";
import "../styles/RecipeDisplay.css";
import React, {useState} from "react";
import { ChatBot } from "./ChatBot.jsx";

export default function RecipeDisplay({ recipe }) {
    const [showChatBot, setShowChatBot] = useState(false);

    const handleButtonClick = () => {
        setShowChatBot(true);
    };

    return (
        <div className="recipe-page">
            <div className="text-content">
                <div className="recipe-title">{recipe.name}</div>
                <div className="form-container">
                    <div className="section">
                        <p className={"section-header"}>Quick Facts</p>
                        <div className={"section-content"}>
                            <ul>
                                <li>This recipe has {recipe.servings} servings</li>
                                <li>Each serving has {recipe.calories} calories</li>
                            </ul>
                        </div>
                    </div>
                    <div className="section">
                        <p className={"section-header"}>Ingredients</p>
                        <div className={"section-content"}>
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => {
                                    let unit = ingredient.Unit;
                                    if (ingredient.Amount === 1) {
                                        unit = unit.slice(0, unit.length - 1);
                                    }
                                    return (
                                        <li key={index}>
                                            {ingredient.Amount} {unit} of {ingredient.Name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="section">
                        <p className={"section-header"}>Instructions</p>
                        <div className={"section-content"}>
                            <ol>
                                {recipe.instructions.map((instruction, index) => {
                                    return (
                                        <li key={index}>
                                            {instruction}
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    </div>
                    {recipe.additionalNotes &&
                        <div className="section">
                            <p className={"section-header"}>Additional Notes</p>
                            <div className={"section-content"}>
                                <p>{recipe.additionalNotes}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="chatBot">
                {showChatBot ? (
                    <ChatBot recipe={recipe} />
                ) : (
                    <button className="chatbot-button" onClick={handleButtonClick}>
                        Having Trouble? Use our ChatBot
                    </button>
                )}
            </div>
        </div>
    );
}
