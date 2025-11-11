# AI Engrave Fill - Backend Server

This is a simple Node.js backend that handles Replicate API calls, avoiding CORS issues.

## Quick Setup

### Prerequisites
- Node.js installed (download from nodejs.org)

### Installation

1. Open terminal/command prompt in this folder
2. Run: `npm install`
3. Create `.env` file with your Replicate token:
   ```
   REPLICATE_API_TOKEN=r8_your_token_here
   ```
4. Run: `node server.js`
5. Server will start on http://localhost:3000

### Usage

1. Keep the server running
2. Open `ai-engrave-fill-backend.html` in your browser
3. Upload outline and generate!

## Files

- `server.js` - Backend API server
- `ai-engrave-fill-backend.html` - Frontend (connects to local server)
- `package.json` - Dependencies
- `.env` - Your API token (create this)

## Cost

- Replicate charges ~$0.10-0.50 per generation
- Add billing at replicate.com/account/billing

## Next Steps for Production

- Deploy to Vercel, Railway, or Heroku
- Add payment processing for customers
- Add user authentication
- Cache results to reduce costs
