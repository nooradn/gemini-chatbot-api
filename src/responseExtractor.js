/**
 * Helper function to extract text from Gemini API response
 * Handles different response formats and provides fallback
 */
export const extractText = (response) => {
  return response?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
         response?.candidates?.[0]?.content?.parts?.[0]?.text ||
         response?.response?.text?.() ||
         response?.text?.() ||
         JSON.stringify(response, null, 2);
};