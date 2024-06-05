import { db } from "./firebase.js";
import express from "express";
import admin from "firebase-admin";

const router = express.Router();

// Get all admin emails
router.get("/", async (req, res) => {
    try {
        const adminDoc = await db.collection('admins').doc('admin_doc').get();
        if (!adminDoc.exists) {
            return res.status(404).send('No admin list found');
        }
        const adminEmails = adminDoc.data().admin_list;
        res.status(200).json(adminEmails);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Find or create user account
router.post("/findOrCreateUser", async (req, res) => {
    const { email } = req.body;
    try {
        // Get user by email
        const userRecord = await admin.auth().getUserByEmail(email);
        const userId = userRecord.uid;

        // Check if user document exists
        const userDoc = await db.collection('users').doc(userId).get();
        if (!userDoc.exists) {
            // Create user document with empty arrays
            await db.collection('users').doc(userId).set({
                email: email,
                createdRecipes: [],
                favoritedRecipes: []
            });
            return res.status(201).send('User document created');
        }

        res.status(200).send('User document already exists');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
