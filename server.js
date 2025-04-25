// replicate-proxy-server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

// Load API key from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

if (!REPLICATE_API_TOKEN) {
  console.error("❌ REPLICATE_API_TOKEN is missing in .env file");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.post("/generate-design", async (req, res) => {
  try {
    const { version, input } = req.body;

    const response = await axios.post(
      "https://api.replicate.com/v1/predictions",
      {
        version, // e.g. 'cf2fcf5270ef442f87a1c12f1f670010e3e226bb7901e94e9c1f3c0e4e0e7e3d'
        input    // JSON containing model input, like { image: base64Image, prompt: "modern bedroom" }
      },
      {
        headers: {
          Authorization: `Token ${REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Replicate API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to call Replicate API" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server is running at http://localhost:${PORT}`);
});
