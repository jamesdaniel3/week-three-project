import React from 'react';
import NavBar from "../components/Navbar.jsx";
import "../styles/Index.css";
import "../styles/Admin.css"; 
import chefLogo from '../assets/chef.png'; 

function Admin() {
    return (
        <>
            <div className="container">
                <NavBar />
                <div className="content">
                    <h1 className="admin-title">Cheffed</h1>
                    <h2 className="admin-subtitle">Admin</h2>
                    <div className="add-button">+</div>
                    <div className="user-profiles">
                        <div className="user-profile">
                            <div className="user-icon">
                                <img src={chefLogo} alt="User Icon" className="user-icon-img" />
                            </div>
                            <div className="recipe-details">
                                <p>Recipe Name</p>
                                <p>Recipe details...</p>
                            </div>
                            <div className="actions">
                                <div className="approve"></div>
                                <div className="reject"></div>
                            </div>
                        </div>
                        <div className="user-profile">
                            <div className="user-icon">
                                <img src={chefLogo} alt="User Icon" className="user-icon-img" />
                            </div>
                            <div className="recipe-details">
                                <p>Recipe Name</p>
                                <p>Recipe details...</p>
                            </div>
                            <div className="actions">
                                <div className="approve"></div>
                                <div className="reject"></div>
                            </div>
                        </div>
                        <div className="user-profile">
                            <div className="user-icon">
                                <img src={chefLogo} alt="User Icon" className="user-icon-img" />
                            </div>
                            <div className="recipe-details">
                                <p>Recipe Name</p>
                                <p>Recipe details...</p>
                            </div>
                            <div className="actions">
                                <div className="approve"></div>
                                <div className="reject"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;