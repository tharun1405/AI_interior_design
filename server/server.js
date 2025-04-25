import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/api/generate', async (req, res) => {
  const { image, style } = req.body;

  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: process.env.REPLICATE_MODEL_VERSION,
        input: {
          image: image,
          prompt: style || "modern living room",
          a_prompt: "best quality, extremely detailed",
          n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers",
          num_inference_steps: 20,
          guess_mode: false,
          strength: 1,
          scale: 9
        }
      },
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const predictionId = response.data.id;

    let predictionResult;
    while (true) {
      const poll = await axios.get(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        {
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          },
        }
      );

      predictionResult = poll.data;
      if (predictionResult.status === 'succeeded' || predictionResult.status === 'failed') break;

      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    if (predictionResult.status === 'succeeded') {
      res.json({ generatedImageUrl: predictionResult.output[1] }); // Use index 1, not 0
    } else {
      res.status(500).json({ error: 'Image generation failed' });
    }
  } catch (error) {
    console.error('Error generating image:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
