# Gemini AI Chatbot

A simple web-based chatbot powered by Google's Gemini AI API.

## Features

- Clean, responsive web interface
- Real-time chat with Gemini AI
- Express.js backend server
- Environment-based configuration

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Make sure your `.env` file contains your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Run the application:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:3000`

## Project Structure

```
gemini-chatbot-api/
├── server.js          # Express server with Gemini API integration
├── index.html         # Frontend HTML
├── script.js          # Frontend JavaScript
├── style.css          # Styling
├── package.json       # Dependencies and scripts
├── .env              # Environment variables (API key)
└── README.md         # This file
```

## API Endpoints

- `GET /` - Serves the main chat interface
- `POST /api/chat` - Processes chat messages and returns AI responses

## Dependencies

- `express` - Web server framework
- `@google/genai` - Google Generative AI SDK
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management