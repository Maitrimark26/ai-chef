
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const RecipeCard = ({ recipe }) => {
  return (
    <motion.div
      className="bg-amber-200 p-4 sm:p-6 rounded-xl shadow-md mt-4 w-full text-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <strong className="block text-lg sm:text-xl mb-2">
        Recipe made with above ingredients:
      </strong>
      <hr className="border-gray-400 mb-2" />
      <p className="text-base sm:text-lg leading-relaxed whitespace-pre-line">
        {recipe.replace(/#/g, "")}
      </p>
    </motion.div>
  );
};
