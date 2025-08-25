/* eslint-disable no-undef */
// /* eslint-disable no-undef */


// import express from 'express';
// import axios from 'axios';
// import cors from 'cors';
// import dotenv from 'dotenv';

// // ✅ Load env variables
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Read API key from .env
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// if (!OPENAI_API_KEY) {
//   console.error("❌ OPENAI_API_KEY not found in .env");
//   process.exit(1);
// }
// app.get('/',(req,res)=>{
//   res.send('Server is running');
// });
// app.get('/api/recipe', (req, res) => {
//   res.send('Use POST request at /api/recipe with ingredients in body');
// });
// app.post("/api/recipe", async (req, res) => {
//   const { ingredients } = req.body;

//   if (!ingredients) {
//     return res.status(400).json({ error: "Ingredients are required" });
//   }

//   try {
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "openai/gpt-3.5-turbo",
//         messages: [
//           {
//             role: "user",
//             content: `Create a unique and creative dish using the following ingredients: ${ingredients}. Provide a dish name and step-by-step cooking instructions.`,
//           },
//         ],
//         max_tokens: 400,
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": "https://dashing-froyo-e2006a.netlify.app/", // replace with deployed frontend URL
//         },
//       }
//     );

//     const reply = response.data.choices[0].message;
//     res.json(reply);
//   } catch (error) {
//     console.error("OpenAI API Error:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to generate recipe" });
//   }
// });

// const port = process.env.PORT 

// app.listen(port, () =>
//   console.log(`✅ Server running at http://localhost:${port}`)
// );
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ✅ Allow only frontend domain + localhost
app.use(cors({
  origin: ["https://dashing-froyo-e2006a.netlify.app", "http://localhost:3000"]
}));
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not found in .env");
  process.exit(1);
}

app.get('/', (req, res) => {
  res.send('✅ Server is running');
});

app.get('/api/recipe', (req, res) => {
  res.send('Use POST request at /api/recipe with ingredients in body');
});

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
          "Content-Type": "application/json"
          // ❌ Removed HTTP-Referer, causes mismatch
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

// ✅ Important fix: default port
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`✅ Server running at http://localhost:${port}`)
);
