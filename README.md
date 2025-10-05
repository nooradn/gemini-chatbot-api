# Gemini AI Chatbot

A modern, professional web-based chatbot powered by Google's Gemini AI API with a clean, structured codebase.

## ✨ Features

- 🎨 Modern messaging interface (Telegram/WhatsApp style)
- 🤖 Real-time chat with Gemini AI
- 🎯 Teal color theme without gradients
- 📱 Fully responsive design
- ⚡ Fast and lightweight
- 🔧 Well-structured, maintainable code
- 🛡️ Error handling and validation
- 📊 API information display

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Your `.env` file is already configured with the API key
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Run the application:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:3000`

## 📁 Project Structure

```
gemini-chatbot-api/
├── 📂 public/               # Frontend assets
│   ├── index.html          # Main HTML file
│   ├── style.css           # Main stylesheet
│   └── app.js              # Frontend JavaScript
├── 📂 src/                 # Backend source code
│   ├── app.js              # Express app configuration
│   ├── api.js              # API routes
│   ├── cors.js             # CORS configuration
│   ├── errorHandler.js     # Error handling
│   └── responseExtractor.js # Response utilities
├── 📂 config/
│   └── gemini.js           # Gemini AI configuration
├── 📂 docs/
│   └── guide.pdf           # Project documentation
├── 📄 server.js            # Main server entry point
├── 📄 package.json         # Dependencies and scripts
├── 📄 .env                 # Environment variables
├── 📄 .gitignore          # Git ignore rules
└── 📄 README.md           # This file
```

## 🛠️ Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm run clean` - Clean node_modules and package-lock
- `npm run lint` - Run code linting (placeholder)

## 🔌 API Endpoints

### Chat API
- **POST** `/api/chat` - Send message to Gemini AI
  ```json
  {
    "message": "Hello, how are you?"
  }
  ```

### Information API
- **GET** `/api/info` - Get API configuration info
- **GET** `/api/health` - Health check endpoint

### Static Files
- **GET** `/` - Main chat interface
- **GET** `/css/*` - Stylesheets
- **GET** `/js/*` - JavaScript files

## 🎨 UI Features

- **Modern Design**: Clean, professional interface
- **Teal Theme**: Consistent teal color scheme
- **Message Bubbles**: WhatsApp/Telegram style messages
- **Typing Indicators**: Animated typing dots
- **Timestamps**: Message time display
- **Responsive**: Works on desktop and mobile
- **Accessibility**: Proper focus management

## 🔧 Technical Features

- **Modular Architecture**: Clean separation of concerns
- **Error Handling**: Comprehensive error management
- **Input Validation**: Message validation and sanitization
- **CORS Support**: Configurable cross-origin requests
- **Environment Config**: Flexible configuration system
- **Graceful Shutdown**: Proper server lifecycle management

## 🛡️ Security

- **API Key Masking**: Only last 4 characters shown
- **Input Sanitization**: Message validation
- **Error Sanitization**: No sensitive data in error responses
- **CORS Configuration**: Configurable allowed origins

## 📦 Dependencies

### Production
- `express` - Web server framework
- `@google/genai` - Google Generative AI SDK
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management

### Development
- Modern ES modules
- Node.js 18+ recommended

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## 📝 License

ISC License - See package.json for details