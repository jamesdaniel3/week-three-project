import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import '../styles/Navbar.css';
import { auth } from "../firebase.js";

export default function NavBar() {
    const [hidden, setHidden] = useState('');
    const navigate = useNavigate();


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
                <img src="src/assets/edge.png" className={"hide-button " + hidden} onClick={hideNav} />
            </button>
            <div className={"main " + hidden}>
                <div className="navbar-header">
                    <span className="title">
                        Cheffed
                    </span>
                </div>
                <Link className="navbar-link" to={"/home"}>
                    <span>
                        Home
                    </span>
                </Link>
                <Link className="navbar-link" to={"/find-recipes"}>
                    <span>
                        Find Recipes
                    </span>
                </Link>
                <Link className="navbar-link" to={"/my-recipes"}>
                    <span>
                        My Recipes
                    </span>
                </Link>
                <div className="navbar-link logout" onClick={logout}>
                    <span>
                        Logout
                    </span>
                </div>
            </div>
        </>
    )
}