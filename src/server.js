import express from "express";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { swaggerDocs } from "./swagger.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);

// Swagger docs
swaggerDocs(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
