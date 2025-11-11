# AI Laser Engraving Fill Generator

A boundary-aware AI pattern generation tool that works exactly like engravefill.app - upload shape outlines, detect boundaries, and fill only inside shapes with AI-generated patterns.

## Features

- **Boundary Detection**: Automatically detects shape boundaries from uploaded images
- **AI Pattern Generation**: Uses Replicate ControlNet-Canny model for intelligent pattern creation
- **Precise Filling**: Fills only inside the detected shape boundaries
- **Real-time Preview**: Live preview of boundary detection and pattern generation
- **Multiple Formats**: Supports various image formats (PNG, JPG, SVG)
- **SVG Clipping**: Traditional pattern fitting with pre-made filigree patterns
- **Adjustable Scaling**: Real-time pattern scaling and customization

## Architecture

```
Frontend (HTML/JS) → Backend (Node.js/Express) → Replicate API → AI Model
       ↓                        ↓                     ↓            ↓
   FormData Upload    →    File Processing   →   ControlNet   →  Pattern
   Boundary Display   ←    Error Handling    ←   Generation   ←  Output
```

## Project Structure

```
dfp-test/
├── ai-engrave-boundary-fill.html    # Main AI boundary-aware tool
├── index.html                       # Traditional filigree fitting tool
├── test-ai-generation.html          # Debugging interface
├── backend/
│   ├── server.js                    # Express server with Replicate API
│   ├── package.json                 # Dependencies
│   ├── .env.example                 # Environment template
│   └── .env                         # Your API keys (not in git)
└── examples/                        # Test images and SVG files
```

## Quick Setup

### For AI Generation (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/DBCREATIONS-lab/dfp-test.git
   cd dfp-test
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure API token**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your Replicate API token
   # Get token from: https://replicate.com/account/api-tokens
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open the application**
   - Open `ai-engrave-boundary-fill.html` in your browser
   - Or use `test-ai-generation.html` for debugging

### For Traditional Filigree Fitting

1. Open `index.html` in a web browser
2. Upload a boundary shape SVG (or use examples in the `examples/` folder)
3. Upload a filigree pattern SVG
4. Adjust the pattern scale using the slider
5. Download your finished design

### Example Files Included

**Boundary Shapes** (`examples/` folder):
- `boundary-knife.svg` - Simple knife outline
- `boundary-circle.svg` - Circular boundary
- `boundary-heart.svg` - Heart shape

**Filigree Patterns** (`examples/` folder):
- `pattern-filigree.svg` - Ornate floral filigree
- `pattern-damask.svg` - Classic damask pattern
- `pattern-celtic.svg` - Celtic knot design
- `pattern-geometric.svg` - Geometric star pattern

## How It Works

1. **Boundary Upload**: The tool extracts the path data from your boundary SVG
2. **Pattern Tiling**: Your chosen pattern is tiled across the entire canvas
3. **Clipping**: SVG clipPath is used to mask the pattern within the boundary
4. **Export**: The final composition is saved as a downloadable SVG

## Usage

### AI Pattern Generation
1. **Upload Shape**: Select an image file with clear shape boundaries
2. **Boundary Detection**: The tool automatically detects shape edges
3. **Pattern Generation**: AI generates patterns that fill only inside the shape
4. **Download Result**: Save the filled pattern as an image

### Traditional Filigree Fitting
1. Upload boundary shapes and filigree patterns
2. Adjust scaling and positioning
3. Preview the clipped result
4. Download as SVG

## API Configuration

The AI backend requires a Replicate API token:

1. Sign up at [Replicate](https://replicate.com)
2. Go to [Account → API Tokens](https://replicate.com/account/api-tokens)
3. Create a new token
4. Add it to `backend/.env`:
   ```bash
   REPLICATE_API_TOKEN=r8_your_token_here
   PORT=3000
   ```

## Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Debugging
- Use `test-ai-generation.html` for step-by-step debugging
- Check browser console for detailed error logs
- Server logs show Replicate API responses

### File Structure
- `ai-engrave-boundary-fill.html`: AI-powered boundary detection and filling
- `index.html`: Traditional filigree pattern fitting
- `backend/server.js`: Express server with file upload and AI processing
- `examples/`: Test images and boundary shapes

## Troubleshooting

**Server won't start:**
- Check that your API token is valid
- Ensure port 3000 is available
- Run `npm install` in the backend directory

**Generation fails:**
- Verify your Replicate API token has credits
- Check that uploaded images have clear boundaries
- Use the test interface for detailed error messages

**CORS errors:**
- Make sure the backend server is running on localhost:3000
- Check that both frontend and backend are on the same domain

**Pattern not showing (Traditional Tool):**
- Check that both boundary and pattern files are valid SVG
- Ensure files contain `<path>` elements
- Try adjusting the scale slider

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Credits

- Built with [Replicate](https://replicate.com) ControlNet-Canny model
- Inspired by engravefill.app functionality
- Uses Express.js, Multer, and HTML5 Canvas
- Traditional filigree fitting with SVG clipping