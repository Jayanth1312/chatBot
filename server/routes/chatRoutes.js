import express from 'express';
import { getGroqChatCompletion } from '../controllers/chatController.js';

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const completion = await getGroqChatCompletion();
    res.json(completion);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
