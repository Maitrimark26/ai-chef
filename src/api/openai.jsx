import axios from 'axios';

export const generateRecipe = async (ingredients) => {
  try {
    console.log('🔍 Sending ingredients:', ingredients); // Debugging

    const response = await axios.post('http://localhost:3001/generate-recipe', {
      ingredients,
    });

    return response.data.recipe;
  } catch (error) {
    console.error("🚨 Recipe API Error:", error);
    alert("Error: " + (error?.response?.data?.error || error.message));
    throw error;
  }
};
