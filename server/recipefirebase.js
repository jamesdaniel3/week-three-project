import express from "express";
import { db } from "./firebase.js";
import admin from "firebase-admin";

const router = express.Router();


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


router.post("/create-recipe", async (req, res) => {
    try {
        const user_uid = req.body.user_uid;
        delete req.body.user_uid

        const recipe = req.body; 
        delete recipe.instructionsType

        const docRef = await db.collection("recipes").add(recipe);

        const userDocRef = db.collection('users').doc(user_uid);
        await userDocRef.update({
            createdRecipes: admin.firestore.FieldValue.arrayUnion(docRef.id)
        });

        res.status(200).json({ id: docRef.id, message: `Successfully created recipe with id ${docRef.id}` });
    } catch (err) {
        console.error('Error creating recipe:', err);
        res.status(400).json({ error: err.message });
    }
});

router.delete("/delete-recipe", async (req, res) => {
    const { id } = req.body;
    try {
        await db.collection("recipes").doc(id).delete();
        res.status(200).json({ message: `Successfully deleted recipe with id ${id}` });
    } catch (err) {
        console.error('Error deleting recipe:', err);
        res.status(400).json({ error: err.message });
    }
});

router.get("/user-favorited-recipes", async (req, res) => {
    const { user_id } = req.query;

    try {
        const userDoc = await db.collection("users").doc(user_id).get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: `User with id ${user_id} does not exist` });
        }

        const userData = userDoc.data();
        const favoritedRecipes = userData.favoritedRecipes || [];

        const recipes = await Promise.all(
            favoritedRecipes.map(async (recipeId) => {
                const recipeDoc = await db.collection("recipes").doc(recipeId).get();
                if (recipeDoc.exists) {
                    return { id: recipeDoc.id, ...recipeDoc.data() };
                }
                return null;
            })
        );

        res.status(200).json(recipes.filter(recipe => recipe !== null));
    } catch (err) {
        console.error('Error fetching favorited recipes:', err);
        res.status(500).json({ error: 'An error occurred while fetching favorited recipes' });
    }
});

router.get("/user-created-recipes", async (req, res) => {
    const { user_id } = req.query;

    try {
        const userDoc = await db.collection("users").doc(user_id).get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: `User with id ${user_id} does not exist` });
        }

        const userData = userDoc.data();
        const createdRecipes = userData.createdRecipes || [];

        const recipes = await Promise.all(
            createdRecipes.map(async (recipeId) => {
                const recipeDoc = await db.collection("recipes").doc(recipeId).get();
                if (recipeDoc.exists) {
                    return { id: recipeDoc.id, ...recipeDoc.data() };
                }
                return null;
            })
        );

        res.status(200).json(recipes.filter(recipe => recipe !== null));
    } catch (err) {
        console.error('Error fetching favorited recipes:', err);
        res.status(500).json({ error: 'An error occurred while fetching favorited recipes' });
    }
});


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


router.put("/add-favorite", async (req, res) => {
    const { user_id, recipe_id, recipe } = req.body;

    try {
        const recipeDoc = await db.collection("recipes").doc(recipe_id).get();

        if (recipeDoc.exists) {
            // Recipe exists, add to user's favoritedRecipes
            await db.collection("users").doc(user_id).update({
                favoritedRecipes: admin.firestore.FieldValue.arrayUnion(recipe_id)
            });
        } else {
            // Recipe does not exist, create it
            await db.collection("recipes").doc(recipe_id).set(recipe);

            // Add to user's favoritedRecipes
            await db.collection("users").doc(user_id).update({
                favoritedRecipes: admin.firestore.FieldValue.arrayUnion(recipe_id)
            });
        }

        res.status(200).json({ message: `Successfully added recipe with id ${recipe_id} to user's favorites` });
    } catch (err) {
        console.error('Error adding recipe to favorites:', err);
        res.status(400).json({ error: err.message });
    }
});


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


router.put("/update-recipe-status", async (req, res) => {
    const { id, status } = req.body;
    try {
        await db.collection('recipes').doc(id).update({ status });
        res.status(200).json({ message: `Successfully updated recipe with id ${id} to status ${status}` });
    } catch (err) {
        console.error('Error updating recipe status:', err);
        res.status(400).json({ error: err.message });
    }
});

export default router;