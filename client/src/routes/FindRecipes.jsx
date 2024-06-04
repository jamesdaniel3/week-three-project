import NavBar from "../components/Navbar.jsx";
import "../styles/Index.css"

function FindRecipes() {

    return (
        <>
            <div className={"container"}>
                <NavBar />
                <div className="content">
                    <p>This is the find recipes page</p>
                </div>
            </div>
        </>
    )
}

export default FindRecipes;