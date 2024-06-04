import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import querystring from "querystring";

dotenv.config();

const appid = process.env.EDAMAM_APP_ID;
const appkey = process.env.EDAMAM_APP_KEY;
const router = express.Router();

router.get('/recipiesearch', async (req, res) => {
    try {
        const filterParams = req.query.filterParams || { diet: "balanced" };
        const query = querystring.stringify(filterParams);
        const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${appid}&app_key=${appkey}&${query}`);
        
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

export default router;