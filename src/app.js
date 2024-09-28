/* eslint-disable */
import express from "express"; // Correct import syntax without parentheses
import recipeRoutes from "./routes/recipeRoutes.js"; // Correct import syntax, including .js for ES modules

const app = express(); // Correct initialization of 'app'

app.use(express.json());

// Use the recipe routes
app.use("/api", recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
