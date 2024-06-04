import { db } from "./firebase.js";
import express from "express";
import axios from "axios";
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
const router = express.Router();

/**
 * returns: list of all recipies
 */
router.get('/recipes', async (req, res) => {
    try {
        let ret = [];
        const querySnapshot = await getDocs(collection(db, "recipes"));
        querySnapshot.forEach((doc) => {
            ret.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        res.status(200).json(ret);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

/** 
 * body: Give Object of the recipe doc
 */
router.post("/create-recipe", async (req, res) => {
    try {
        const recipe = req.body.recipe; // Object of the doc
        const docRef = await addDoc(collection(db, "recipe"), recipe);
        res.status(200).json({ id: docRef.id, message: `Successfully created user with id ${docRef.id}` });
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

/** 
 * body: id of the recipe doc
 */
router.delete("/delete-recipe", async (req, res) => {
    const id = req.body.id;
    try {
        await deleteDoc(doc(db, "recipes", id))
        res.status(200).json({ message: `Successfully deleted recipe with id ${id}` });
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

/** 
 * body: give the id for a user
 * returns: list of IDs of recipes
 */
router.get("/user-favorites", async (req, res) => {
    const id = req.body.id;
    try {
        const docSnap = await getDoc(doc(db, "favorites", id));
        if (docSnap.exists()) {
            res.status(200).json(docSnap);  
        } else {
            console.log(`Document '${classID}' does not exist`);
            res.status(500).json({ error: `Doc with id ${id} does not exist` });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

/** 
 * body: give ID of recipe
 * returns: JSON object of recipe
 */
router.get("/recipe", async (req, res) => {
    const id = req.body.id;
    try {
        const docSnap = await getDoc(doc(db, "recipes", id));
        if (docSnap.exists()) {
            res.status(200).json(docSnap);  
        } else {
            console.log(`Document '${classID}' does not exist`);
            res.status(500).json({ error: `Doc with id ${id} does not exist` });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});
export default router;