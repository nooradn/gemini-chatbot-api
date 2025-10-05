import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = "gemini-2.5-flash";

// Helper function to extract text from response
const extractText = (response) => {
  return response?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
    response?.candidates?.[0]?.content?.parts?.[0]?.text ||
    response?.response?.text?.() ||
    response?.text?.() ||
    JSON.stringify(response, null, 2);
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API info endpoint
app.get('/api/info', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const maskedKey = apiKey ? '••••••••••••' + apiKey.slice(-4) : '••••••••••••';
  
  res.json({
    model: GEMINI_MODEL,
    apiKey: maskedKey
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Generate response using Gemini
    const result = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ parts: [{ text: message }] }]
    });
    const text = extractText(result);

    res.json({ response: text });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});