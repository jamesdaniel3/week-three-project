import NavBar from "../components/Navbar.jsx";
import RecipeDisplay from "../components/RecipeDisplay.jsx";
import "../styles/Index.css"

function Recipe() {

    /*
    The plan is to use useparam to get the information about the recipe from firebase/edamam by providing a UID in the
    url. For now I am just going to pretend I had the data and build out the page.
     */

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
                "Amount": 1,
                "Name": "Oats",
                "Unit": "Cups"
            },
            {
                "Amount": 2,
                "Name": "Peanut Butter",
                "Unit": "Tablespoons"
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