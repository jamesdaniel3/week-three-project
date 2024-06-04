import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import '../styles/Navbar.css';
import { auth } from "../firebase.js";

export default function NavBar() {
    const navigate = useNavigate();

    const logout = () => {
        signOut(auth)
            .then(() => { navigate('/') });
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
            <div className={"main "}>
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