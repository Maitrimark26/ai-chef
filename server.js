
/* eslint-disable no-undef */
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ CORS: allow frontend domain + localhost
app.use(
  cors({
    origin: ["https://dashing-froyo-e2006a.netlify.app", "http://localhost:3000"],
  })
);
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not found in environment variables");
  process.exit(1);
}

// ✅ Simple health check
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

// ✅ Optional GET route for testing


// ✅ POST route: main GPT request
app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    return res.status(400).json({ error: "Ingredients are required" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // ya gpt-4o-mini
        messages: [
          {
            role: "user",
            content: `Create a unique and creative dish using the following ingredients: ${ingredients}. Provide a dish name and step-by-step cooking instructions.`,
          },
        ],
        max_tokens: 400,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://dashing-froyo-e2006a.netlify.app", // frontend domain
          "X-Title": "AI Chef",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ content: reply });
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});


// ✅ Port: Render sets process.env.PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
