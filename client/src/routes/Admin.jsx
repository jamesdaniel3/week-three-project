import NavBar from "../components/Navbar.jsx";
import "../styles/Index.css"

function Admin() {

    return (
        <>
            <div className={"container"}>
                <NavBar />
                <div className="content">
                    <p>This is the admin page</p>
                </div>
            </div>
        </>
    )
}

export default Admin;