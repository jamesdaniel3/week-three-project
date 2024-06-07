import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {getAuth, signOut} from "firebase/auth";
import '../styles/Navbar.css';
import '../styles/Index.css'
import { auth } from "../firebase.js";
import chefHatLogo from '../assets/chefs-hat.png';
import edge from '../assets/edge.png'

export default function NavBar() {
    const [hidden, setHidden] = useState('');
    const navigate = useNavigate();

    const admin_emails = ["jamesmd333@gmail.com", "shamsul.r.haque@gmail.com", "annadbatman@gmail.com", "simrith.ranjan@gmail.com", "test@test.com"]

    const auth = getAuth();
    const user_email = auth.currentUser.email;


    const logout = () => {
        signOut(auth)
            .then(() => { navigate('/') });
    }

    const hideNav = () => {
        console.log("HIDING");
        if (hidden === '') {
            setHidden('hidden');
        } else {
            setHidden('');
        }
    }

    if (auth) {
        auth.onAuthStateChanged(function (user) {
            if (!user) {
                logout();
            }
        })
    }

    return (
        <>
            <button className="hide-button">
                <img src={edge} className={"hide-button " + hidden} onClick={hideNav} />
            </button>
            <div className={"main " + hidden}>
                <div className="navbar-header">
                    <img src={chefHatLogo} alt="Chef Hat Logo" className="logo" /> {/* Add the logo */}
                    <span className="title">Cheffed</span>
                </div>
                <Link className="navbar-link" to={"/home"}>
                    <span>Home</span>
                </Link>
                <Link className="navbar-link" to={"/find-recipes"}>
                    <span>Find Recipes</span>
                </Link>
                <Link className="navbar-link" to={"/my-recipes"}>
                    <span>My Recipes</span>
                </Link>
                <Link className="navbar-link" to={"/create-recipe"}>
                    <span>
                        Create a Recipe
                    </span>
                </Link>
                {admin_emails.includes(user_email) &&
                    <Link className="navbar-link" to={"/admin"}>
                    <span>
                        Admin
                    </span>
                    </Link>
                }
                <div className="navbar-link logout" onClick={logout}>
                    <span>Logout</span>
                </div>
            </div>
        </>
    )
}