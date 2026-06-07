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
    const { message } = req.body;

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
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});