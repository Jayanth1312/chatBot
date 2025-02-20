import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGeminiChatCompletion(message) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    if (!message || typeof message !== 'string') {
      throw new Error('Invalid message format');
    }

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    return text;
  } catch (error) {
    console.error("Error in Gemini completion:", error.message);
    throw new Error('Failed to get response from Gemini');
  }
}
