import NavBar from "../components/Navbar.jsx";
import "../styles/Index.css"
function Home() {

    return (
        <>
            <div className={"container"}>
                <NavBar />
                <div className="content">
                    <p>This is the home page</p>
                </div>
            </div>
        </>
    )
}

export default Home;