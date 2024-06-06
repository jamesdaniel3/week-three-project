import React, { useEffect, useState } from 'react';
import NavBar from "../components/Navbar.jsx";
import "../styles/Index.css";
import "../styles/Admin.css"; 
import chefLogo from '../assets/chef.png'; 
import plusIcon from '../assets/plus.png'; 
import { db } from '../firebase'; 
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import RecipeDetailsModal from '../components/RecipeDetailsModal'; 

function Admin() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const q = query(collection(db, 'recipes'), where('status', '==', 'NEW'), where('userCreated', '==', true));
                const querySnapshot = await getDocs(q);
                const newRecipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRecipes(newRecipes);
                console.log(newRecipes); 
            } catch (error) {
                console.error("Error fetching recipes: ", error);
            }
        };

        fetchRecipes();
    }, []);

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRecipe(null);
    };

    const approveRecipe = async (id) => {
        try {
            const recipeDoc = doc(db, 'recipes', id);
            await updateDoc(recipeDoc, { status: 'OLD' });
            setRecipes(recipes.filter(recipe => recipe.id !== id));
            handleCloseModal();
        } catch (error) {
            console.error("Error approving recipe: ", error);
        }
    };

    const rejectRecipe = async (id) => {
        try {
            const recipeDoc = doc(db, 'recipes', id);
            await updateDoc(recipeDoc, { status: 'OLD' });
            setRecipes(recipes.filter(recipe => recipe.id !== id));
            handleCloseModal();
        } catch (error) {
            console.error("Error rejecting recipe: ", error);
        }
    };

    return (
        <>
            <div className="container">
                <NavBar />
                <div className="content">
                    <h1 className="admin-title">Cheffed</h1>
                    <h2 className="admin-subtitle">Admin</h2>
                    <img src={plusIcon} alt="Add" className="add-button" />
                    <div className="user-profiles">
                        {recipes.map(recipe => (
                            <div
                                className="user-profile"
                                key={recipe.id}
                                onClick={() => handleRecipeClick(recipe)} 
                            >
                                <div className="user-icon">
                                    <img src={chefLogo} alt="User Icon" className="user-icon-img" />
                                </div>
                                <div className="recipe-details">
                                    <p>{recipe.name}</p>
                                    <p>{recipe.additionalNotes}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {isModalOpen && (
                        <RecipeDetailsModal
                            recipe={selectedRecipe}
                            onClose={handleCloseModal}
                            onApprove={approveRecipe}
                            onReject={rejectRecipe}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Admin;

