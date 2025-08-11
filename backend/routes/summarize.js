import express from "express";
import fetch from "node-fetch";
import summary from "../models/summary.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Summarize route
router.post("/summarize", async (req , res) => {
    try {
        const { text } = req.body;
        if(!text){
            return res.status(400).json({ error: "Text is required! "});
        }

        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: text })
            }
        );

        const data = await response.json();
        if(data.error) throw new Error(data.error);

        const summaryText = data[0]?.summary_text || "No summary generated.";

        await summary.create({ originalText: text, summary: summaryText });

        res.json({ summary: summaryText });
    } catch (error){
        console.error(error);
        res.status(500).json({error: error.message });
    }

    
});

// History route

router.get("/history", async (req, res) => {
    try {
        const history = await summary.find().sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



export default router;