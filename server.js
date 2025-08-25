/* eslint-disable no-undef */

// import express from 'express';
// import axios from 'axios';
// import cors from 'cors';
// // import dotenv from 'dotenv';

// // dotenv.config();
// import dotenv from 'dotenv';
// dotenv.config();
// // eslint-disable-next-line no-undef
// // const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// const OPENAI_API_KEY="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"

// const app = express();
// app.use(cors());
// app.use(express.json());





// app.post("/api/recipe", async (req, res) => {
//   const { ingredients } = req.body;

//   if (!ingredients) {
//     return res.status(400).json({ error: "Ingredients are required" });
//   }

//   try {
//    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
//   {
//     model: "openai/gpt-3.5-turbo", // ✅ Must include 'openai/' prefix
//     messages: [
//       {
//         role: "user",
//         content: `Create a unique and creative dish using the following ingredients: ${ingredients}. Provide a dish name and step-by-step cooking instructions.`,
//       },
//     ],
//     max_tokens: 400,
//     temperature: 0.7,
//   },
//   {
//     headers: {
//       Authorization: `Bearer ${OPENAI_API_KEY}`, // ✅ Use your OpenRouter key
//       "Content-Type": "application/json",
//       "HTTP-Referer": "http://localhost:3000", // ✅ Must be your app’s URL or localhost
//     },
//   }
// );

    

//     const reply = response.data.choices[0].message;
//     res.json(reply);
//   } catch (error) {
//     console.error("OpenAI API Error:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to generate recipe" });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));

import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

// ✅ Load env variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Read API key from .env
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not found in .env");
  process.exit(1);
}
app.get('/',(req,res)=>{
  res.send('Server is running');
})
app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    return res.status(400).json({ error: "Ingredients are required" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
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
          "HTTP-Referer": "http://localhost:3000", // replace with deployed frontend URL
        },
      }
    );

    const reply = response.data.choices[0].message;
    res.json(reply);
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

const port = process.env.PORT 

app.listen(port, () =>
  console.log(`✅ Server running at http://localhost:${port}`)
);
