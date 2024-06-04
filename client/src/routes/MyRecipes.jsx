import NavBar from "../components/Navbar.jsx";
import "../styles/Index.css"

function MyRecipes() {

    return (
        <>
            <div className={"container"}>
                <NavBar />
                <div className="content">
                    <p>This is the recipe library page</p>
                </div>
            </div>
        </>
    )
}

export default MyRecipes;