import NavBar from "../components/Navbar.jsx";
import RecipeForm from "../components/RecipeForm.jsx";
import "../styles/Index.css"
function CreateRecipe() {

    return (
        <>
            <div className={"container"}>
                <NavBar />
                <div className="content">
                    <RecipeForm />
                </div>
            </div>
        </>
    )
}

export default CreateRecipe;