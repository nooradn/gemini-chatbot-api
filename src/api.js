import express from 'express';
import { ai, GEMINI_MODEL } from '../config/gemini.js';
import { extractText } from './responseExtractor.js';

const router = express.Router();

/**
 * GET /api/info
 * Returns API configuration information
 */
router.get('/info', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const maskedKey = apiKey ? '••••••••••••' + apiKey.slice(-4) : '••••••••••••';
  
  res.json({
    model: GEMINI_MODEL,
    apiKey: maskedKey,
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/chat
 * Processes chat messages and returns AI responses
 */
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Validation
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Message is required and must be a string' 
      });
    }

    if (message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Message cannot be empty' 
      });
    }

    if (message.length > 10000) {
      return res.status(400).json({ 
        error: 'Message too long. Maximum 10,000 characters allowed.' 
      });
    }

    // Generate response using Gemini
    const result = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ parts: [{ text: message.trim() }] }]
    });

    const text = extractText(result);

    res.json({ 
      response: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Handle specific Gemini API errors
    if (error.message?.includes('API key')) {
      return res.status(401).json({ 
        error: 'Invalid API key configuration' 
      });
    }

    if (error.message?.includes('quota')) {
      return res.status(429).json({ 
        error: 'API quota exceeded. Please try again later.' 
      });
    }

    res.status(500).json({ 
      error: 'Failed to generate response. Please try again.' 
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    model: GEMINI_MODEL
  });
});

export default router;