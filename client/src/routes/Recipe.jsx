import NavBar from "../components/Navbar.jsx";
import RecipeDisplay from "../components/RecipeDisplay.jsx";
import "../styles/Index.css"
import { useParams } from "react-router-dom";

function Recipe() {

    const { id, location } = useParams();


    const recipe = {
        additionalNotes: "",
        calories: 200,
        glutenFree: true,
        vegetarian: false,
        status: "ACCEPTED",
        userCreated: true,
        instructions: ["Step 1", "Step 2"],
        instructionsLink: "https://ricorp.twa.rentmanager.com/Login?ReturnUrl=%2fShared%2fHome",
        servings: 6,
        name: "Overnight Oats",
        ingredients: [
            {
                amount: 1,
                name: "Oats",
                unit: "Cups"
            },
            {
                amount: 2,
                name: "Peanut Butter",
                unit: "Tablespoons"
            }
        ]

    }

    return (
        <>
            <div className={"container"}>
                <NavBar />
                <div className="content">
                    <RecipeDisplay recipe={recipe}/>
                </div>
            </div>
        </>
    )
}

export default Recipe;