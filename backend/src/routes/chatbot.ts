import express from 'express';
import { ChatbotRequest, ChatbotResponse } from '../types';
import chatbotService from '../services/chatbotService';

const router = express.Router();

// Chat with AI assistant
router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId, context } = req.body;

    // Validation
    if (!message || !sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Message and sessionId are required'
      });
    }

    // Create request object
    const request: ChatbotRequest = {
      message,
      sessionId,
      context: context || {
        interests: [],
        visitedPages: [],
        askedAbout: [],
        conversationHistory: []
      }
    };

    // Process message with AI service
    const response: ChatbotResponse = await chatbotService.getAdvancedResponse(request);

    res.json({
      success: true,
      message: 'Chat response generated successfully',
      data: response
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process chat message'
    });
  }
});

// Get chatbot suggestions
router.get('/suggestions', (req, res) => {
  try {
    const suggestions = [
      "Tell me about Michael's projects",
      "What skills does Michael have?",
      "How can I contact Michael?",
      "Show me Michael's resume",
      "What technologies does Michael use?",
      "Tell me about IoT projects",
      "React development services",
      "Michael's experience"
    ];

    res.json({
      success: true,
      message: 'Suggestions retrieved successfully',
      data: suggestions
    });
  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve suggestions'
    });
  }
});

// Get chatbot info
router.get('/info', (req, res) => {
  try {
    const info = {
      name: "Michael's AI Assistant",
      version: "1.0.0",
      capabilities: [
        "Answer questions about Michael's work",
        "Provide project information",
        "Share contact details",
        "Discuss technical skills",
        "Offer personalized recommendations"
      ],
      features: [
        "Natural language processing",
        "Context-aware responses",
        "Interactive actions",
        "Personalized suggestions"
      ]
    };

    res.json({
      success: true,
      message: 'Chatbot info retrieved successfully',
      data: info
    });
  } catch (error) {
    console.error('Get chatbot info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve chatbot info'
    });
  }
});

export default router;
