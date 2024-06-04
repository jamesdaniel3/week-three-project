import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { db } from "./firebase.js";
import bodyParser from "body-parser";
import loginRouter from "./login.js";
import chatRouter from "./chatgpt.js"
const app = express();
const port = 8888;

app.use(cors());
app.use(express.json());

app.use("/login", loginRouter);
app.use("/chat", chatRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});