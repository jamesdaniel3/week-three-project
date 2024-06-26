import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import axios from 'axios';
import "../styles/Login.css";
import "../styles/Index.css"
import admin from "./Admin.jsx";

const Login = () => {
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Check if user is logged in and auto-populate
    useEffect(() => {
        if (auth) {
            auth.onAuthStateChanged(function (user) {
                if (user) {
                    setUsername(user.email);
                }
            });
        }
    }, []);

    const handleChangePass = (event) => {
        const value = event.target.value;
        setPassword(value);
    };

    const handleChangeUser = (event) => {
        const value = event.target.value;
        setUsername(value);
    };

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                return userCredential.user;
            })
            .then(() => {
                return axios.get('http://localhost:8888/login');
            })
            .then(response => {
                const adminEmails = response.data;
                if (adminEmails.includes(email)) {
                    navigate('/admin');
                } else {
                    navigate('/home');
                }
            })
            .then(() => {
                return axios.post('http://localhost:8888/login/findOrCreateUser', { email: email });
            })
            .catch((e) => {
                if (e.code === "auth/invalid-email") {
                    console.log("EMAIL WRONG");
                    setErrorMessage("Email Invalid");
                }
                if (e.code === 'auth/missing-password') {
                    console.log("ENTER A VALID PASSWORD");
                    setErrorMessage("Enter a Password");
                }
                if (e.code === 'auth/invalid-credential') {
                    console.log("USER NOT FOUND");
                    setErrorMessage("User not Found.");
                } else {
                    console.log(e);
                }
            });
    };

    return (
        <>
            <div className='login-body'>
                <div className='login-main'>
                    <div className='login-main-header'>
                        <h1> Login </h1>
                    </div>
                    <form onSubmit={login}className='login-boxes'>
                        <input value={email} placeholder='email' onChange={handleChangeUser} />
                        <input value={password} type='password' placeholder='password' onChange={handleChangePass} />
                        <div className='login-option'>
                        <div style={{display: "flex", alignItems: "center", gap: "20px", justifyContent: "center", flexDirection: "column"}}>
                          <button type="submit" className='login-button'> LOGIN </button>
                          <p>Don't have an accuont? Sign Up <a href="/signup">Here</a></p>
                        </div>    
                        
                    </div>
                    </form>
                    
                    <span className='error-message'> {errorMessage} </span>
                </div>
            </div>
        </>
    );
};

export default Login;
