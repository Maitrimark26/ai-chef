

// export default App;
import { InputCard } from "./components/InputCard";
import "./App.css";
//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-yellow-200 to-orange-400 flex flex-col items-center">
      
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 p-10 sm:p-20 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        🍽️ AI Chef
      </motion.h1>

      {/* InputCard with fade + slide */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full flex justify-center px-4"
      >
        <InputCard />
      </motion.div>
    </div>
  );
}

export default App;
