import "../styles/Index.css"
import "../styles/RecipeDisplay.css"
import React from "react";

export default function RecipeDisplay({recipe}){
    console.log(recipe);
    return (
        <div className="recipe-page">
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
                    </div>
                </div>
                <div className="section">
                    <p className={"section-header"}>Instructions</p>
                    <div className={"section-content"}>
                    </div>
                </div>
                <div className="section">
                    <p className={"section-header"}>Additional Notes</p>
                    <div className={"section-content"}>
                    </div>
                </div>
            </div>
        </div>
    );
}