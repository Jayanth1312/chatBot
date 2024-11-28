import express from 'express';
import { getGroqChatCompletion, getGeminiChatCompletion } from '../controllers/chatController.js';

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message, model = "groq" } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    let response;
    console.log(`Using model: ${model}`);
    
    try {
      if (model === "gemini") {
        response = await getGeminiChatCompletion(message);
      } else {
        response = await getGroqChatCompletion(message);
      }
    } catch (modelError) {
      console.error(`Error with ${model} model:`, modelError);
      return res.status(500).json({ 
        error: modelError.message,
        model: model
      });
    }
    
    if (!response) {
      return res.status(500).json({ 
        error: `No response from ${model} model`,
        model: model
      });
    }
    
    res.json({ message: response });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message
    });
  }
});

export default router;
