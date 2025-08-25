
import axios from "axios";
import "../App.css";
import { useState } from "react";
import { RecipeCard } from "./RecipeCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; // ✅ Animation library

export const InputCard = () => {
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");

  const HandleSubmit = async () => {
    if (!ingredients.trim()) {
      alert("Please enter the ingredients");
      return;
    }

    setLoading(true);
    setRecipe("");

    try {
      const response = await axios.post("http://localhost:5000/api/recipe", {
        ingredients,
      });
      setRecipe(response.data.content);
    } catch (err) {
      console.error(err);
      alert("Error");
      setRecipe("❌ Error fetching recipe. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="bg-blue-200 p-6 sm:p-8 rounded-2xl shadow-md flex flex-col gap-4 justify-center items-center w-full max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.label
        className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Enter ingredients
      </motion.label>

      <motion.input
        className="w-full p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg sm:text-xl text-gray-800"
        type="text"
        placeholder="e.g. tomato, garlic, rice"
        onChange={(e) => setIngredients(e.target.value)}
        value={ingredients}
        whileFocus={{ scale: 1.02 }}
      />

      <motion.button
        onClick={HandleSubmit}
        className="bg-green-500 px-6 py-3 text-lg sm:text-xl font-medium text-white rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Generate Recipe
      </motion.button>

      {loading && (
        <motion.p
          className="text-gray-700 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading recipe...
        </motion.p>
      )}

      {!loading && recipe && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <RecipeCard recipe={recipe} />
        </motion.div>
      )}
    </motion.div>
  );
};
