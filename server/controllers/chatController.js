import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
    throw error;
  }
}
