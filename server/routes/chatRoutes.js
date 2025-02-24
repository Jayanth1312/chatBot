import express from 'express';
import { getGeminiChatCompletion } from '../controllers/chatController.js';

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    let response;
    
    try {
      response = await getGeminiChatCompletion(message);
    } catch (modelError) {
      console.error('Error with Gemini model:', modelError);
      return res.status(500).json({ 
        error: modelError.message,
        model: 'gemini'
      });
    }
    
    if (!response) {
      return res.status(500).json({ 
        error: 'No response from Gemini model',
        model: 'gemini'
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
