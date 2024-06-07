import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import '../styles/Navbar.css';
import '../styles/Index.css';
import { auth } from "../firebase.js";
import chefHatLogo from '../assets/chefs-hat.png';
import edge from '../assets/edge.png';
import homeLogo from '../assets/home.png';
import searchLogo from '../assets/search.png';
import recipeBookLogo from '../assets/recipe-book.png';
import cookingLogo from '../assets/cooking.png';
import checkOutLogo from '../assets/check-out.png';

export default function NavBar() {
    const [hidden, setHidden] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const logout = () => {
        signOut(auth)
            .then(() => { navigate('/'); });
    }

    const hideNav = () => {
        setHidden(hidden === '' ? 'hidden' : '');
    }

    return (
        <>
            <button className="hide-button">
                <img src={edge} className={"hide-button " + hidden} onClick={hideNav} />
            </button>
            <div className={"main " + hidden}>
                <div className="navbar-header">
                    <img src={chefHatLogo} alt="Chef Hat Logo" className="logo" />
                    <span className="title">Cheffed</span>
                </div>
                <Link className="navbar-link" to={"/home"}>
                    <img src={homeLogo} alt="Home" className="logo" />
                    <span>Home</span>
                </Link>
                <Link className="navbar-link" to={"/find-recipes"}>
                    <img src={searchLogo} alt="Find Recipes" className="logo" />
                    <span>Find Recipes</span>
                </Link>
                <Link className="navbar-link" to={"/my-recipes"}>
                    <img src={recipeBookLogo} alt="My Recipes" className="logo" />
                    <span>My Recipes</span>
                </Link>
                <Link className="navbar-link" to={"/create-recipe"}>
                    <img src={cookingLogo} alt="Create a Recipe" className="logo" />
                    <span>Create a Recipe</span>
                </Link>
                {isLoggedIn && (
                    <div className="navbar-link logout" onClick={logout}>
                        <img src={checkOutLogo} alt="Logout" className="logo" />
                        <span>Logout</span>
                    </div>
                )}
            </div>
        </>
    );
}