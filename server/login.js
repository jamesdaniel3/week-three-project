const db = require('./firebase');
const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');

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

module.exports = router;