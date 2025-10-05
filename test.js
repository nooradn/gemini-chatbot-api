import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = "gemini-2.5-flash";

console.log('Testing Gemini API...');
console.log('AI object methods:', Object.getOwnPropertyNames(ai));

try {
    console.log('Available models methods:', Object.getOwnPropertyNames(ai.models));
    console.log('Models prototype:', Object.getOwnPropertyNames(Object.getPrototypeOf(ai.models)));

    // Try different approaches
    const result = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [{ parts: [{ text: 'Hello, how are you?' }] }]
    });
    console.log('Result:', result);
} catch (error) {
    console.error('Error:', error.message);
}