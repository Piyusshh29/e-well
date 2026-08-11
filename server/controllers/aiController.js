const { saveMessage, getMessagesByUser } = require("../models/aiModel");

const generateMockAIResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes("sleep")) {
    return "Sleep is crucial for wellness! Try to aim for 7-9 hours. Reading a book or listening to white noise before bed can help you drift off faster.";
  } else if (msg.trim().match(/^(hi|hello|hey)($|\s)/i)) {
    return "Hello there! I'm your E-WELL AI assistant. How can I help you improve your wellness today?";
  } else if (msg.includes("stress") || msg.includes("anxious") || msg.includes("anxiety")) {
    return "Dealing with stress is tough. I recommend taking a 5-minute break to do some deep breathing exercises. Our Meditation tracker might also have some helpful routines!";
  } else if (msg.includes("water") || msg.includes("hydration") || msg.includes("thirsty")) {
    return "Staying hydrated is key! Remember to drink at least 8 glasses of water a day. Keep a water bottle nearby as a visual reminder.";
  } else if (msg.includes("mood") || msg.includes("sad") || msg.includes("happy") || msg.includes("feeling")) {
    return "Your mood is an important indicator of your overall health. Make sure to log it in the Mood Tracker so we can monitor trends over time. Is there anything specific on your mind?";
  } else {
    return "That's a great observation about your wellness journey. Make sure to use our trackers to keep logging your progress. What else would you like to discuss?";
  }
};

const sendMessage = async (req, res) => {
  const { content } = req.body;
  const user_id = req.user.id;

  if (!content) {
    return res.status(400).json({ success: false, message: "Message content is required" });
  }

  try {
    // 1. Save user's message
    const userMsg = await saveMessage(user_id, 'user', content);

    // 2. Generate and save AI response
    const aiResponseContent = generateMockAIResponse(content);
    
    // Simulate slight delay for realism
    setTimeout(async () => {
      try {
        const aiMsg = await saveMessage(user_id, 'ai', aiResponseContent);
        res.status(201).json({ success: true, messages: [userMsg, aiMsg] });
      } catch (err) {
        console.error("Error saving AI message:", err);
        res.status(500).json({ success: false, message: "Server error" });
      }
    }, 800);
    
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getHistory = async (req, res) => {
  const user_id = req.user.id;

  try {
    const history = await getMessagesByUser(user_id);
    res.status(200).json({ success: true, messages: history });
  } catch (error) {
    console.error("Error in getHistory controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  sendMessage,
  getHistory,
};
