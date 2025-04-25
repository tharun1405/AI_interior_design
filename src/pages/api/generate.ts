// pages/api/generate.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, style } = req.body;

  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: 'a9758d3b26c7fd6cfb6ad2a1c8c3ab5674d94d4dc5b5cdebbf3bb09e191a148d', // Replace with the actual model version you are using
        input: {
          image: image,
          style: style,
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
      console.log(`Prediction status: ${predictionResult.status}`);

      if (predictionResult.status === 'succeeded' || predictionResult.status === 'failed') {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (predictionResult.status === 'succeeded' && predictionResult.output?.[0]) {
      return res.status(200).json({ generatedImageUrl: predictionResult.output[0] });
    } else {
      return res.status(500).json({ error: 'Image generation failed' });
    }
  } catch (error) {
    console.error('Replicate error:', error?.response?.data || error.message || error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
