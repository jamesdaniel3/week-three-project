import express from "express";
import { db } from "./firebase.js";

const router = express.Router();

/**
 * @Return : list of all recipes
 */
router.get('/recipes', async (req, res) => {
    try {
        let ret = [];
        const querySnapshot = await db.collection('recipes').get();
        querySnapshot.forEach((doc) => {
            ret.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        console.log(ret);
        res.status(200).json(ret);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

/** 
 * @Body : Object of the recipe doc
 */
router.post("/create-recipe", async (req, res) => {
    try {
        const recipe = req.body.recipe; // Object of the doc
        const response = await db.collection("recipes").add(recipe);
        res.status(200).json({ id: docRef.id, message: `Successfully created recipe with id ${docRef.id}` });
    } catch (err) {
        console.error('Error creating recipe:', err);
        res.status(400).json({ error: err.message });
    }
});

/** 
 * @Body : id of the recipe doc
 */
router.delete("/delete-recipe", async (req, res) => {
    const { id } = req.body;
    try {
        await deleteDoc(doc(db, "recipes", id));
        await db.collection("recipes").delete(id);
        res.status(200).json({ message: `Successfully deleted recipe with id ${id}` });
    } catch (err) {
        console.error('Error deleting recipe:', err);
        res.status(400).json({ error: err.message });
    }
});

/** 
 * @Query : give the id for a user
 * @Return : list of IDs of recipes
 */
router.get("/user-favorites", async (req, res) => {
    const { id } = req.query;
    try {
        const docSnap = await db.collection("users").doc(id).get();
        if (docSnap.exists) {
            res.status(200).json(docSnap.data());
        } else {
            console.log(`Document with id '${id}' does not exist`);
            res.status(404).json({ error: `Document with id ${id} does not exist` });
        }
    } catch (err) {
        console.error('Error fetching user favorites:', err);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

/** 
 * @Query : give ID of recipe
 * @Return : JSON object of recipe
 */
router.get("/recipe", async (req, res) => {
    const { id } = req.query;
    try {
        const docSnap = await db.collection("recipes").doc(id).get();
        if (docSnap.exists) {
            res.status(200).json(docSnap.data());
        } else {
            console.log(`Document with id '${id}' does not exist`);
            res.status(404).json({ error: `Document with id ${id} does not exist` });
        }
    } catch (err) {
        console.error('Error fetching recipe:', err);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

/** 
 * @Query : give ?userid=""&recipeid="" in parameters
 */
router.put("/add-favorite", async (req, res) => {
    const { userid, recipeid } = req.query;
    console.log(userid, recipeid);
    try {
        const docSnap = await db.collection("users").doc(userid).get();
        if (docSnap.exists) {
            await db.collection("users").doc(userid).update({
                favoriteRecipes: [...docSnap.data().favoriteRecipes, recipeid],
            });
            res.status(200).json({ message: `Successfully added recipe with id ${recipeid} to favorites` });
        } else {
            await db.collection("users").doc(userid).set({
                favoriteRecipes: [recipeid],
            });
            res.status(200).json({ message: `Successfully added recipe with id ${recipeid} to favorites` });
        }
    } catch (err) {
        console.error('Error adding recipe to favorites:', err);
        res.status(400).json({ error: err.message });
    }
});

/** 
 * @Query : give ?userid=""&recipeid="" in parameters
 */
router.put("/add-created", async (req, res) => {
    const { userid, recipeid } = req.query;
    console.log(userid, recipeid);
    try {
        const docSnap = await db.collection("users").doc(userid).get();
        if (docSnap.exists) {
            await db.collection("users").doc(userid).update({
                createdRecipes: [...docSnap.data().createdRecipes, recipeid],
            });
            res.status(200).json({ message: `Successfully added recipe with id ${recipeid} to created` });
        } else {
            await db.collection("users").doc(userid).set({
                createdRecipes: [recipeid],
            });
            res.status(200).json({ message: `Successfully added recipe with id ${recipeid} to created` });
        }
    } catch (err) {
        console.error('Error adding recipe to favorites:', err);
        res.status(400).json({ error: err.message });
    }
});
export default router;
