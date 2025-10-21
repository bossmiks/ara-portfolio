import { ChatbotRequest, ChatbotResponse } from '../types';

class ChatbotService {
  private responses: { [key: string]: any } = {
    greeting: [
      "👋 Hello! I'm Michael's AI assistant. How can I help you today?",
      "Hi there! Welcome to Michael's portfolio. What would you like to know?",
      "Hey! I'm here to help you explore Michael's work and skills."
    ],
    projects: [
      "🚀 Michael has worked on amazing projects including IoT systems, web applications, and smart solutions!",
      "Check out Michael's portfolio - he's built everything from IoT devices to modern web apps!",
      "Michael's projects showcase his expertise in React, TypeScript, IoT development, and more!"
    ],
    skills: [
      "💻 Michael is skilled in React, TypeScript, JavaScript, IoT development, and modern web technologies!",
      "His tech stack includes React, Node.js, Firebase, Arduino, and various databases.",
      "Michael specializes in full-stack development with a focus on IoT and smart systems!"
    ],
    contact: [
      "📧 You can reach Michael at aramichae19@gmail.com or through his LinkedIn profile!",
      "Contact Michael for collaborations, job opportunities, or just to say hello!",
      "Michael is always open to discussing new projects and opportunities!"
    ],
    default: [
      "That's interesting! Can you tell me more about what you're looking for?",
      "I'd be happy to help you learn more about Michael's work and skills!",
      "What specific aspect of Michael's portfolio interests you most?"
    ]
  };

  async processMessage(request: ChatbotRequest): Promise<ChatbotResponse> {
    const { message, sessionId, context } = request;
    const lowerMessage = message.toLowerCase();

    // Determine response type based on message content
    let responseType = 'default';
    let actions: any[] = [];

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      responseType = 'greeting';
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      responseType = 'projects';
      actions = [
        { label: "View Projects", action: "navigate", data: "/projects", icon: "Code" },
        { label: "GitHub Profile", action: "external", data: "https://github.com/bossmiks", icon: "ExternalLink" }
      ];
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('technology')) {
      responseType = 'skills';
      actions = [
        { label: "View Skills", action: "navigate", data: "/about", icon: "Brain" },
        { label: "Download Resume", action: "download", data: "/resume.pdf", icon: "Download" }
      ];
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('email')) {
      responseType = 'contact';
      actions = [
        { label: "Send Email", action: "email", data: "mailto:aramichae19@gmail.com", icon: "Mail" },
        { label: "LinkedIn", action: "external", data: "https://www.linkedin.com/in/michael-ara-jr-317819291/", icon: "ExternalLink" },
        { label: "Contact Page", action: "navigate", data: "/contact", icon: "Phone" }
      ];
    }

    // Get random response from the appropriate category
    const responses = this.responses[responseType];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Add personalized context if available
    let personalizedResponse = randomResponse;
    if (context?.name) {
      personalizedResponse = `Hi ${context.name}! ${randomResponse}`;
    }

    return {
      text: personalizedResponse,
      actions: actions.length > 0 ? actions : undefined,
      context: {
        responseType,
        timestamp: new Date().toISOString(),
        sessionId
      },
      sessionId
    };
  }

  // Add more sophisticated AI responses
  async getAdvancedResponse(request: ChatbotRequest): Promise<ChatbotResponse> {
    const { message, context } = request;
    const lowerMessage = message.toLowerCase();

    // Check for specific technology mentions
    if (lowerMessage.includes('react') || lowerMessage.includes('typescript')) {
      return {
        text: "🎯 Great choice! Michael is highly skilled in React and TypeScript. He builds modern, type-safe applications with excellent user experiences!",
        actions: [
          { label: "React Projects", action: "navigate", data: "/projects", icon: "Code" },
          { label: "View Skills", action: "navigate", data: "/about", icon: "Brain" }
        ],
        sessionId: request.sessionId
      };
    }

    if (lowerMessage.includes('iot') || lowerMessage.includes('arduino')) {
      return {
        text: "🔧 Awesome! Michael specializes in IoT development with Arduino, ESP8266, and smart systems. He creates connected solutions that make life easier!",
        actions: [
          { label: "IoT Projects", action: "navigate", data: "/projects", icon: "Cpu" },
          { label: "Contact for IoT", action: "email", data: "mailto:aramichae19@gmail.com", icon: "Mail" }
        ],
        sessionId: request.sessionId
      };
    }

    // Fallback to basic response
    return this.processMessage(request);
  }
}

export default new ChatbotService();
