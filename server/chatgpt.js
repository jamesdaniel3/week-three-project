import dotenv from "dotenv";
import OpenAI from "openai";
import express from "express";

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("/completion", async (req, res) => {
    const messages = req.body.messages;
    try {
      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
      });
      console.log(completion.choices[0]);
      res.status(200).send(completion.choices[0].message.content);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while processing your request.");
    }
});

export default router;