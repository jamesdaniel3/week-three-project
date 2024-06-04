import { db } from "./firebase.js";
import express from "express";
import admin from "firebase-admin";

const router = express.Router();
// get all admin emails
router.get("/", async (req, res) => {
    try {
        const adminDoc = await db.collection('admins').doc('admin_doc').get();
        if (!adminDoc.exists) {
            return res.status(404).send('No admin list found');
        }
        const adminEmails = adminDoc.data().admin_list;
        console.log(adminEmails)
        res.status(200).json(adminEmails);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;