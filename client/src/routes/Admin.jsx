import React, { useEffect, useState } from 'react';
import NavBar from "../components/Navbar.jsx";
import "../styles/Index.css";
import "../styles/Admin.css"; 
import chefLogo from '../assets/chef.png'; 
import plusIcon from '../assets/plus.png'; 
import { db } from '../firebase'; 
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import axios from 'axios'; 

function Admin() {
    const [recipes, setRecipes] = useState([]);

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

    // Approve recipe
    const approveRecipe = async (id) => {
        try {
            const recipeDoc = doc(db, 'recipes', id);
            await updateDoc(recipeDoc, { status: 'OLD' });
            setRecipes(recipes.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error("Error approving recipe: ", error);
        }
    };

    // Reject recipe
    const rejectRecipe = async (id) => {
        try {
            const recipeDoc = doc(db, 'recipes', id);
            await updateDoc(recipeDoc, { status: 'OLD' });
            setRecipes(recipes.filter(recipe => recipe.id !== id));
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
                    <img src={plusIcon} alt="Add" className="add-button" /> {/* plus */}
                    <div className="user-profiles">
                        {recipes.map(recipe => (
                            <div className="user-profile" key={recipe.id}>
                                <div className="user-icon">
                                    <img src={chefLogo} alt="User Icon" className="user-icon-img" />
                                </div>
                                <div className="recipe-details">
                                    <p>{recipe.name}</p>
                                    <p>{recipe.additionalNotes}</p>
                                </div>
                                <div className="actions">
                                    <div className="approve" onClick={() => approveRecipe(recipe.id)}></div>
                                    <div className="reject" onClick={() => rejectRecipe(recipe.id)}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;