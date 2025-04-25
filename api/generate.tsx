// api/generate.js
const express = require("express");
const Replicate = require("replicate");
const router = express.Router();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

router.post("/", async (req, res) => {
  const { image, roomType, designStyle, colorScheme, budget, includeRecommendations } = req.body;

  try {
    const output = await replicate.run(
      "jagilley/controlnet-hough:db21e45c7ce59346fdfb652b7f1b40d84f9c6e5d18893208ba6f6c1e7792787d",
      {
        input: {
          image, // base64-encoded image from frontend
          prompt: `A ${designStyle} ${roomType} with ${colorScheme} colors and a budget of $${budget}k.`,
        }
      }
    );

    const generatedImage = output?.[0] || null;

    res.json({
      generatedImage,
      recommendations: includeRecommendations
        ? [
            {
              name: "Cozy Sofa",
              category: "Furniture",
              price: 799,
              link: "https://example.com/product/sofa",
              image: "https://via.placeholder.com/300x200",
            },
            {
              name: "Modern Lamp",
              category: "Lighting",
              price: 149,
              link: "https://example.com/product/lamp",
              image: "https://via.placeholder.com/300x200",
            },
          ]
        : [],
    });
  } catch (err) {
    console.error("Replicate API error:", err?.response?.data || err.message || err);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

module.exports = router;
