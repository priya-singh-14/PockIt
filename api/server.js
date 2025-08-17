// /api/index.js
import express from "express";
import dotenv from "dotenv";
import publicRoutes from "./routes/public.js";
import protectedRoutes from "./routes/protected.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/", publicRoutes);
app.use("/api", protectedRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
