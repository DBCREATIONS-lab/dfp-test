const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Replicate = require('replicate');
const multer = require('multer');
const path = require('path');

// Load environment variables from the correct path
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Initialize Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend server is running!',
    hasToken: !!process.env.REPLICATE_API_TOKEN
  });
});

// Generate scrollwork design
app.post('/api/generate', upload.single('boundaryImage'), async (req, res) => {
  try {
    console.log('Received generation request');
    
    if (!process.env.REPLICATE_API_TOKEN) {
      return res.status(500).json({ 
        error: 'Server not configured - missing REPLICATE_API_TOKEN in .env file' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ 
        error: 'No boundary image uploaded. Please upload a PNG/SVG outline.' 
      });
    }

    const { prompt, negativePrompt, guidanceScale, steps, controlnetStrength } = req.body;
    
    console.log('Parameters:', { 
      prompt, 
      negativePrompt, 
      guidanceScale, 
      steps,
      controlnetStrength,
      fileSize: req.file.size 
    });

    // Convert buffer to base64 data URI
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    // Enhanced prompt for pattern filling
    const enhancedPrompt = `${prompt || "intricate western scrollwork engraving pattern, flowing acanthus leaves and baroque flourishes, ornate decorative fill, black and white line art, laser engraving ready, detailed filigree design"}, ornate pattern filling the white area completely, dense scrollwork, decorative engraving design, black line art on white background`;
    
    console.log('Enhanced prompt:', enhancedPrompt);

    // Try Stable Diffusion XL inpainting for better area filling
    try {
      const output = await replicate.run(
        "stability-ai/stable-diffusion-xl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            prompt: enhancedPrompt,
            negative_prompt: `${negativePrompt || "blurry, low quality, pixelated, color, photographic, 3d render, text, watermark"}, empty space, blank areas, void regions, sparse pattern`,
            image: base64Image,
            width: 1024,
            height: 1024,
            guidance_scale: parseFloat(guidanceScale) || 15,
            num_inference_steps: parseInt(steps) || 50,
            num_outputs: 1,
            scheduler: "K_EULER"
          }
        }
      );
      
      console.log('SDXL generation successful');
      const imageUrl = Array.isArray(output) ? output[0] : output;
      return res.json({ success: true, imageUrl: imageUrl });
      
    } catch (sdxlError) {
      console.log('SDXL failed, trying fallback model:', sdxlError.message);
      
      // Fallback to a different approach - use img2img for pattern generation
      const output = await replicate.run(
        "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
        {
          input: {
            prompt: enhancedPrompt,
            negative_prompt: `${negativePrompt || "blurry, low quality, pixelated, color, photographic, 3d render, text, watermark"}, empty space, blank areas`,
            image: base64Image,
            strength: 0.8,
            guidance_scale: parseFloat(guidanceScale) || 15,
            num_inference_steps: parseInt(steps) || 50,
            num_outputs: 1
          }
        }
      );
    }

    console.log('Generation successful');
    
    // Output is an array of image URLs
    const imageUrl = Array.isArray(output) ? output[0] : output;
    
    res.json({ 
      success: true, 
      imageUrl: imageUrl
    });

  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate design',
      details: error.toString()
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`
🚀 AI Engrave Fill Backend Server Running!

Server URL: http://localhost:${PORT}
Test endpoint: http://localhost:${PORT}/api/test
Frontend: Open ai-engrave-fill-backend.html in your browser

${process.env.REPLICATE_API_TOKEN ? '✅ Replicate API token configured' : '❌ WARNING: No REPLICATE_API_TOKEN in .env file!'}

Press Ctrl+C to stop the server
  `);
});
