# Gemini AI Chatbot

A modern web-based chatbot powered by Google's Gemini AI API.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ef9954f8-4632-4094-9453-b48b45fc0438" />

## Features

- Modern messaging interface (WhatsApp/Telegram style)
- Real-time chat with Gemini AI
- Teal color theme
- Responsive design
- Model information display

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the application:**
   ```bash
   npm start
   ```

3. **Open browser:**
   - Go to `http://localhost:3000`

## Project Structure

```
gemini-chatbot-api/
├── public/          # Frontend files
├── src/             # Backend files
├── config/          # Configuration
├── server.js        # Main entry point
└── package.json     # Dependencies
```

## API Endpoints

- `POST /api/chat` - Send message to AI
- `GET /api/info` - Get API configuration
- `GET /api/health` - Health check

## Dependencies

- `express` - Web server
- `@google/genai` - Gemini AI SDK
- `cors` - Cross-origin support
- `dotenv` - Environment variables
