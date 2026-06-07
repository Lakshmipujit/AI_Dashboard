const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "Message is required",
            });
        }

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
        });

        res.json({
            reply: response.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to generate response",
        });
    }
});

app.get("/", (req, res) => {
    res.send("AI Dashboard Backend Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});