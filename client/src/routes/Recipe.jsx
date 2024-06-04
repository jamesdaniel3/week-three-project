import NavBar from "../components/Navbar.jsx";
import "../styles/Index.css"

function Recipe() {

    return (
        <>
            <div className={"container"}>
                <NavBar />
                <div className="content">
                    <p>This is the recipe page</p>
                </div>
            </div>
        </>
    )
}

export default Recipe;