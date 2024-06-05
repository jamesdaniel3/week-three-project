import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { db } from "./firebase.js";
import bodyParser from "body-parser";
import loginRouter from "./login.js";
import chatRouter from "./chatgpt.js";
import edamamRouter from "./edamam.js";
import recipefirebaseRouter from "./recipefirebase.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/login", loginRouter);
app.use("/chat", chatRouter);
app.use("/edamam", edamamRouter);
app.use("/recipefirebase", recipefirebaseRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});