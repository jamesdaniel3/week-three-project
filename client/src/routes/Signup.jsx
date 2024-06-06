
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../styles/Login.css";


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const handleSignUp = async (event) => {
      event.preventDefault();
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Sign up successfully')
        navigate('/');
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          setError('User already exists with this email');
        } else {
          setError("Password must be at least 6 characters");
        }
      }
    };
  
    return (
      <div className="login-body">
        <div className="login-main">
            <div className="login-main-header">
              <h1> Create an account </h1>
            </div>
        <form className="login-boxes" onSubmit={handleSignUp}>
            
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            required
          />
          {error && <div className="error-message">{error}</div>}
          <div style={{display: "flex", alignItems: "center", gap: "20px", justifyContent: "center", flexDirection: "column", marginTop: "10px"}}>
          <button className="login-button" type="submit">SIGN UP</button>
          <p>Already have an account? Login <a href="/">Here</a></p>
          
          </div>
          
        </form>
        </div>
      </div>
    );
  };
  
  export default Signup;


