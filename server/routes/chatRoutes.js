import express from 'express';
import { getGroqChatCompletion } from '../controllers/chatController.js';

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await getGroqChatCompletion(message);
    res.json({ message: response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
