import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGroqChatCompletion(message) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama3-8b-8192",
    });
    return completion.choices[0]?.message?.content || "No response from Groq";
  } catch (error) {
    console.error("Error in Groq completion:", error);
    throw new Error(`Groq Error: ${error.message}`);
  }
}

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
