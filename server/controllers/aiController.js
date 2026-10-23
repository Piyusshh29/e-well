
const { GoogleGenAI } = require("@google/genai");
const { saveMessage, getMessagesByUser } = require("../models/aiModel");
const { getHealthContext } = require("../services/healthContextService");

const getGeminiClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not configured in the server environment"
    );
  }

  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
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

// Existing AI chat functionality.
const sendMessage = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  if (typeof content !== "string" || !content.trim()) {
    return res.status(400).json({
      success: false,
      message: "Message content is required",
    });
  }

  try {
    const cleanContent = content.trim();

    const userMsg = await saveMessage(userId, "user", cleanContent);

    let aiResponseContent;

    try {
      aiResponseContent = await generateAIResponse(cleanContent);
    } catch (error) {
      console.error("Gemini response generation failed:", error.message);

      return res.status(502).json({
        success: false,
        message:
          "The AI assistant is temporarily unavailable. Please try again.",
      });
    }

    const aiMsg = await saveMessage(
      userId,
      "ai",
      aiResponseContent
    );

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

// Existing AI chat history.
const getHistory = async (req, res) => {
  try {
    const history = await getMessagesByUser(req.user.id);

    return res.status(200).json({
      success: true,
      messages: history,
    });
  } catch (error) {
    console.error("Error in getHistory controller:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to load chat history.",
    });
  }
};

// Personalized wellness advice based on the user's actual records.
const getWellnessAdvice = async (req, res) => {
  try {
    const userId = req.user.id;
    const healthContext = await getHealthContext(userId);
    const ai = getGeminiClient();

    const response = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: [
        "You are E-WELL, a supportive student wellness coach.",
        "Personalize your advice using the student's actual records below.",
        "Identify simple patterns in mood, sleep, hydration and stress.",
        "Suggest 3 to 5 practical actions tailored to the available data.",
        "If a category has no records, say there is not enough data for it.",
        "Do not invent measurements or claim that missing records exist.",
        "Do not diagnose conditions or prescribe treatment.",
        "Keep the language friendly, clear and easy to follow.",
        "If the records indicate high stress, respond supportively without judgment.",
        "",
        "Student's recent wellness records (JSON):",
        JSON.stringify(healthContext, null, 2),
      ].join("\n"),
      store: false,
    });

    const advice = response.output_text;

    if (!advice || !advice.trim()) {
      throw new Error("Gemini returned an empty wellness response");
    }

    return res.status(200).json({
      success: true,
      advice: advice.trim(),
      data: healthContext,
    });
  } catch (error) {
    console.error("Wellness coach error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to generate personalized wellness advice.",
    });
  }
};

module.exports = {
  sendMessage,
  getHistory,
  getWellnessAdvice,
};
