import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles/Index.css"

import Admin from "./routes/Admin.jsx";
import Login from "./routes/Login.jsx";
import Home from "./routes/Home.jsx";
import FindRecipes from "./routes/FindRecipes.jsx";
import Recipe from "./routes/Recipe.jsx";
import MyRecipes from "./routes/MyRecipes.jsx";
import CreateRecipe from "./routes/CreateRecipe.jsx"

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/find-recipes" element={<FindRecipes />} />
                <Route path="/create-recipe" element={<CreateRecipe />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/my-recipes" element={<MyRecipes />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
