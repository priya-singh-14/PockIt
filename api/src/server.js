import dotenv from "dotenv";
import express from "express";
import axios from "axios";

dotenv.config();
import cors from "cors";
import { authenticateToken } from "../auth/middleware.js";

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

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/health", (req, res) => {
  res.json({
    response: "healthy",
  });
});

app.get("/api/product-details", async (req, res) => {
  try {
    const baseURL = process.env.BASE_URL || "";
    const token = process.env.API_TOKEN;

    const productUrl = req.query.url;
    if (!productUrl) {
      return res
        .status(400)
        .json({ error: "Missing required query parameter: url" });
    }
    const params = {
      token,
      url: productUrl,
    };

    const response = await axios.get(baseURL, {
      params: params,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/api/current-user", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
