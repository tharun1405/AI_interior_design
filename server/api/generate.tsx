// pages/api/generate.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { image, style } = req.body;

  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: 'YOUR_REPLICATE_MODEL_VERSION', // Replace this with actual model version (e.g., jagilley/controlnet-hough)
        input: {
          image: image,
          style: style, // include more params as needed
        },
      },
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { id } = response.data;

    // Polling the prediction status until it's done
    let predictionResult;
    while (true) {
      const pollRes = await axios.get(`https://api.replicate.com/v1/predictions/${id}`, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });

      predictionResult = pollRes.data;
      if (predictionResult.status === 'succeeded' || predictionResult.status === 'failed') break;

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (predictionResult.status === 'succeeded') {
      res.status(200).json({ generatedImageUrl: predictionResult.output[0] });
    } else {
      res.status(500).json({ error: 'Image generation failed' });
    }
  } catch (error) {
    console.error('Replicate error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
