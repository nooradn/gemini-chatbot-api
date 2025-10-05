import app from './src/app.js';

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Gemini Chat Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from public directory`);
  console.log(`🤖 Using Gemini model: gemini-2.5-flash`);
  console.log(`🔑 API Key: ${process.env.GEMINI_API_KEY ? '✓ Configured' : '✗ Missing'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});