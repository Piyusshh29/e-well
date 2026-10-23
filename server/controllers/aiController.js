const { GoogleGenAI } = require("@google/genai");
const { saveMessage, getMessagesByUser } = require("../models/aiModel");

const getGeminiClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured in the server environment");
  }

  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

const generateAIResponse = async (userMessage) => {
  const ai = getGeminiClient();

  const response = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: [
      "You are E-WELL, a friendly student wellness assistant.",
      "Give supportive, practical, easy-to-understand guidance about general wellbeing, study stress, sleep, hydration, mood, and healthy routines.",
      "Do not diagnose medical or mental health conditions or claim to replace a qualified professional.",
      "If the user describes immediate danger or a risk of self-harm, encourage them to contact local emergency services or a trusted person immediately.",
      "Keep replies concise, empathetic, and actionable.",
      "",
      "Student's message:",
      userMessage,
    ].join("\n"),
    store: false,
  });

  const answer = response.output_text;
  if (!answer || !answer.trim()) {
    throw new Error("Gemini returned an empty response");
  }

  return answer.trim();
};

const sendMessage = async (req, res) => {
  const { content } = req.body;
  const user_id = req.user.id;

  if (typeof content !== "string" || !content.trim()) {
    return res.status(400).json({
      success: false,
      message: "Message content is required",
    });
  }

  try {
    const cleanContent = content.trim();

    // Keep the user's message in the existing PostgreSQL chat history.
    const userMsg = await saveMessage(user_id, "user", cleanContent);

    let aiResponseContent;
    try {
      aiResponseContent = await generateAIResponse(cleanContent);
    } catch (error) {
      console.error("Gemini response generation failed:", error.message);
      return res.status(502).json({
        success: false,
        message: "The AI assistant is temporarily unavailable. Please try again.",
      });
    }

    const aiMsg = await saveMessage(user_id, "ai", aiResponseContent);

    return res.status(201).json({
      success: true,
      messages: [userMsg, aiMsg],
    });
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to process your message right now.",
    });
  }
};

const getHistory = async (req, res) => {
  const user_id = req.user.id;

  try {
    const history = await getMessagesByUser(user_id);
    return res.status(200).json({ success: true, messages: history });
  } catch (error) {
    console.error("Error in getHistory controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to load chat history.",
    });
  }
};

module.exports = {
  sendMessage,
  getHistory,
};
