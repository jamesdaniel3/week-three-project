// RecipeDetailsModal.jsx
import React from 'react';
import "../styles/RecipeDetailsModal.css"; 

const RecipeDetailsModal = ({ recipe, onClose, onApprove, onReject }) => {
  if (!recipe) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{recipe.name}</h2>
        <p>Calories: {recipe.calories}</p>
        <p>Gluten Free: {recipe.glutenFree ? 'Yes' : 'No'}</p>
        <p>Vegetarian: {recipe.vegetarian ? 'Yes' : 'No'}</p>
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
        {recipe.instructionsLink && (
          <p>
            Additional instructions:{' '}
            <a href={recipe.instructionsLink} target="_blank" rel="noopener noreferrer">
              {recipe.instructionsLink}
            </a>
          </p>
        )}
        <p>Additional Notes: {recipe.additionalNotes}</p>
        <div className="modal-actions">
          <button className="approve" onClick={() => onApprove(recipe.id)}>Approve</button>
          <button className="reject" onClick={() => onReject(recipe.id)}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsModal;


