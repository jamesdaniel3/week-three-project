import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import axios from 'axios';
import "../styles/Login.css";
import "../styles/index.css"

const Login = () => {
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // check if user is logged in and auto-populate
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

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => setUser(userCredential.user))
            .then(() => {
                axios.get('http://localhost:8888/login')
                    .then(response => {
                        const adminEmails = response.data;
                        if (adminEmails.includes(email)) {
                            navigate('/admin');
                        } else {
                            navigate('/home');
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching admin emails:", error);
                        setErrorMessage("Error checking admin status");
                    });
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
                    <div className='login-boxes'>
                        <input value={email} placeholder='email' onChange={handleChangeUser} />
                        <input value={password} type='password' placeholder='password' onChange={handleChangePass} />
                    </div>
                    <div className='login-option'>
                        <button className='login-button' onClick={login}> LOGIN </button>
                    </div>
                    <span className='error-message'> {errorMessage} </span>
                </div>
            </div>
        </>
    );
};

export default Login;