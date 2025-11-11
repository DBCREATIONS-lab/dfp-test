# SVG Filigree Fitter Demo

A web-based tool for fitting ornate filigree patterns into custom boundary shapes. Perfect for creating decorative knife handles, jewelry designs, or any artistic engraving work.

## Features

- **Upload Custom Boundaries**: Import SVG files with path outlines (knife handles, shapes, etc.)
- **Pattern Library**: Choose from pre-made filigree patterns or upload your own
- **Adjustable Scaling**: Real-time pattern scaling from 0.1x to 2.5x
- **SVG Clipping**: Automatically clips patterns to fit within boundary shapes
- **Download Results**: Export your finished design as an SVG file

## Getting Started

### Quick Start

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

## Usage Tips

- **Boundary SVGs**: Use simple, closed paths for best results. Complex multi-path shapes may need manual editing
- **Pattern SVGs**: Seamless or near-seamless patterns work best for a professional look
- **Scale Adjustment**: Start with default scale (1.0x) and adjust to your preference
- **Black & White**: Patterns with clear contrast produce the best engraving results

## Technical Details

- Pure HTML/CSS/JavaScript - no server required
- Uses SVG `<clipPath>` for boundary fitting
- Pattern tiling via SVG `<pattern>` element
- Client-side file processing with FileReader API

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

This is a demo project. Feel free to use and modify for your needs.

## Repository

Source: [https://github.com/DBCREATIONS-lab/dfp-test](https://github.com/DBCREATIONS-lab/dfp-test)

## Future Enhancements

- AI-based intelligent pattern rearrangement
- Multiple pattern layers
- Color customization
- Pattern rotation and positioning controls
- Save/load project functionality