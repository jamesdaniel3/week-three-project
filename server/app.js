const cors = require('cors');
const express = require('express');
const axios = require('axios');
const db = require('./firebase');
const admin = require('firebase-admin');
const app = express();
const port = 8888;

app.use(cors());
app.use(express.json());

// Import the router modules
const loginRouter = require("./login");

// Use the router modules
app.use("/login", loginRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});