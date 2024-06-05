import NavBar from "../components/Navbar.jsx";
import "../styles/Index.css"
import "../styles/RecipeSearch.css"
import { useEffect, useState } from "react"
import RecipeSearch from "../components/RecipeSearch.jsx"
function FindRecipes() {
    const [recipes, setRecipes] = useState([]);

    return (
        <>
            <div className="container">
                <NavBar />
                <div className="content">
                    <h1>Cheffed</h1>
                    <RecipeSearch />
                </div>
            </div>
        </>
    )
}

export default FindRecipes;