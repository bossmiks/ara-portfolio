import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Download, ExternalLink, Calendar, Code, Mail, Phone, Brain, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  hasActions?: boolean;
  actions?: Array<{label: string; action: () => void; icon?: React.ReactNode}>;
  context?: string;
}

interface UserContext {
  name?: string;
  interests: string[];
  visitedPages: string[];
  askedAbout: string[];
  conversationHistory: string[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '🧠 Hello! I\'m Michael\'s AI assistant powered by advanced conversation intelligence. I learn from our chat to provide personalized help. What brings you to his portfolio today?', isBot: true, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userContext, setUserContext] = useState<UserContext>({
    interests: [],
    visitedPages: [],
    askedAbout: [],
    conversationHistory: []
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateUserContext = (message: string, topic: string) => {
    setUserContext(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, message],
      askedAbout: prev.askedAbout.includes(topic) ? prev.askedAbout : [...prev.askedAbout, topic],
      interests: extractInterests(message, prev.interests)
    }));
  };

  const extractInterests = (message: string, currentInterests: string[]): string[] => {
    const techKeywords = ['react', 'typescript', 'javascript', 'iot', 'web development', 'frontend', 'backend', 'mobile', 'ai', 'machine learning', 'node.js', 'firebase', 'database'];
    const found = techKeywords.filter(keyword => 
      message.toLowerCase().includes(keyword) && !currentInterests.includes(keyword)
    );
    return [...currentInterests, ...found];
  };

  const navigateToPage = (page: string) => {
    setUserContext(prev => ({
      ...prev,
      visitedPages: prev.visitedPages.includes(page) ? prev.visitedPages : [...prev.visitedPages, page]
    }));
    window.location.href = `/${page}`;
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Michael_Ara_Resume.pdf';
    link.click();
  };

  const openEmail = () => {
    window.open('mailto:aramichae19@gmail.com?subject=Portfolio Inquiry&body=Hi Michael, I found your portfolio and would like to connect!', '_blank');
  };

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/michael-ara-jr-317819291/', '_blank');
  };

  const openGitHub = () => {
    window.open('https://github.com/bossmiks', '_blank');
  };

  const getPersonalizedResponse = (message: string): {text: string; actions?: Array<{label: string; action: () => void; icon?: React.ReactNode}>} => {
    const msg = message.toLowerCase();
    const hasAskedBefore = (topic: string) => userContext.askedAbout.includes(topic);
    const isReturningVisitor = userContext.conversationHistory.length > 3;
    
    // Extract user name if mentioned
    const nameMatch = msg.match(/(?:i'm|i am|my name is|call me) (\w+)/);
    if (nameMatch && !userContext.name) {
      setUserContext(prev => ({ ...prev, name: nameMatch[1] }));
    }

    // Intelligent project recommendations
    if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio')) {
      updateUserContext(message, 'projects');
      const personalizedText = hasAskedBefore('projects') 
        ? `${userContext.name ? userContext.name + ', ' : ''}Since you're interested in projects, here are Michael's most innovative works including IoT solutions and React applications. ${userContext.interests.length > 0 ? `Based on your interest in ${userContext.interests.join(', ')}, you might especially like his tech-focused projects.` : ''}`
        : "🚀 Michael has worked on cutting-edge projects including IoT solutions, React applications, and modern web technologies. His work focuses on creating smart, connected systems.";
      
      return {
        text: personalizedText,
        actions: [
          { label: "View Projects", action: () => navigateToPage('projects'), icon: <Code size={16} /> },
          { label: "GitHub Profile", action: openGitHub, icon: <ExternalLink size={16} /> },
          { label: "Technical Skills", action: () => navigateToPage('about'), icon: <Brain size={16} /> }
        ]
      };
    }
    
    // Smart skill recommendations
    if (msg.includes('skill') || msg.includes('tech') || msg.includes('technology') || msg.includes('stack')) {
      updateUserContext(message, 'skills');
      const skillText = isReturningVisitor 
        ? `${userContext.name ? userContext.name + ', ' : ''}Michael's expertise spans React, TypeScript, IoT development, and modern web technologies. ${userContext.interests.includes('react') ? 'Perfect match for your React interest!' : ''} He also works with Firebase, Node.js, and creates seamless device integrations.`
        : "💻 Michael specializes in React, TypeScript, JavaScript, IoT development, and modern web technologies. He creates intelligent, connected systems with seamless user experiences.";
      
      return {
        text: skillText,
        actions: [
          { label: "View Skills", action: () => navigateToPage('about'), icon: <Code size={16} /> },
          { label: "Download Resume", action: downloadResume, icon: <Download size={16} /> },
          { label: "See Projects", action: () => navigateToPage('projects'), icon: <Sparkles size={16} /> }
        ]
      };
    }
    
    // Intelligent contact handling
    if (msg.includes('contact') || msg.includes('hire') || msg.includes('email') || msg.includes('reach') || msg.includes('collaborate')) {
      updateUserContext(message, 'contact');
      const contactText = userContext.conversationHistory.some(h => h.includes('project') || h.includes('skill'))
        ? `${userContext.name ? userContext.name + ', ' : ''}Great! Since you've shown interest in Michael's work, he'd love to discuss potential collaborations or opportunities with you!`
        : "📧 Ready to connect with Michael? He's always open to discussing new opportunities, collaborations, and innovative projects!";
      
      return {
        text: contactText,
        actions: [
          { label: "Send Email", action: openEmail, icon: <Mail size={16} /> },
          { label: "LinkedIn", action: openLinkedIn, icon: <ExternalLink size={16} /> },
          { label: "Contact Page", action: () => navigateToPage('contact'), icon: <Phone size={16} /> },
          { label: "Download Resume", action: downloadResume, icon: <Download size={16} /> }
        ]
      };
    }
    
    // Educational background with context
    if (msg.includes('education') || msg.includes('academic') || msg.includes('degree') || msg.includes('university') || msg.includes('study')) {
      updateUserContext(message, 'education');
      return {
        text: `🎓 Michael has a strong educational foundation with continuous learning in technology and IoT development. ${hasAskedBefore('education') ? 'His academic background complements his practical experience perfectly.' : 'He believes in lifelong learning and staying current with emerging technologies.'}`,
        actions: [
          { label: "View Education", action: () => navigateToPage('academics'), icon: <Calendar size={16} /> },
          { label: "Download Resume", action: downloadResume, icon: <Download size={16} /> },
          { label: "See Skills", action: () => navigateToPage('about'), icon: <Brain size={16} /> }
        ]
      };
    }
    
    // Resume with smart suggestions
    if (msg.includes('resume') || msg.includes('cv') || msg.includes('download') || msg.includes('experience')) {
      updateUserContext(message, 'resume');
      const resumeText = userContext.askedAbout.length > 1 
        ? `${userContext.name ? userContext.name + ', ' : ''}Perfect! Michael's resume contains all his professional experience, skills, and achievements. Since you've been exploring his ${userContext.askedAbout.join(' and ')}, you'll find detailed information about everything we've discussed.`
        : "📄 Michael's comprehensive resume showcases his professional journey, technical expertise, and project achievements. It's regularly updated with his latest work and skills.";
      
      return {
        text: resumeText,
        actions: [
          { label: "Download PDF", action: downloadResume, icon: <Download size={16} /> },
          { label: "View Online", action: () => navigateToPage('resume'), icon: <ExternalLink size={16} /> },
          { label: "Contact Michael", action: openEmail, icon: <Mail size={16} /> }
        ]
      };
    }
    
    // Personalized greetings
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('start')) {
      const greetingText = isReturningVisitor 
        ? `${userContext.name ? `Welcome back, ${userContext.name}!` : 'Welcome back!'} 👋 Ready to continue exploring Michael's portfolio? ${userContext.interests.length > 0 ? `I remember you're interested in ${userContext.interests.slice(0,2).join(' and ')}.` : ''}`
        : "👋 Welcome to Michael's portfolio! I'm his AI assistant with advanced conversation intelligence. I'll learn about your interests as we chat to provide personalized recommendations.";
      
      return {
        text: greetingText,
        actions: [
          { label: "View Projects", action: () => navigateToPage('projects'), icon: <Code size={16} /> },
          { label: "Contact Michael", action: () => navigateToPage('contact'), icon: <Mail size={16} /> },
          { label: "Download Resume", action: downloadResume, icon: <Download size={16} /> }
        ]
      };
    }
    
    // About Michael with context
    if (msg.includes('about') || msg.includes('who') || msg.includes('michael') || msg.includes('tell me')) {
      updateUserContext(message, 'about');
      return {
        text: `👨💻 Michael is a passionate developer specializing in IoT solutions and modern web development. He creates smart, connected systems with seamless device integration. ${userContext.interests.includes('iot') ? 'Perfect match for your IoT interests!' : ''} His work combines technical excellence with innovative problem-solving.`,
        actions: [
          { label: "Learn More", action: () => navigateToPage('about'), icon: <ExternalLink size={16} /> },
          { label: "View Projects", action: () => navigateToPage('projects'), icon: <Code size={16} /> },
          { label: "See Skills", action: () => navigateToPage('about'), icon: <Brain size={16} /> }
        ]
      };
    }
    
    // Mobile app development
    if (msg.includes('mobile') || msg.includes('app development') || msg.includes('android') || msg.includes('ios') || msg.includes('flutter') || msg.includes('react native')) {
      updateUserContext(message, 'mobile');
      return {
        text: "📱 Michael offers mobile app development services using React Native and Flutter. He creates cross-platform apps with native performance and seamless user experiences for both iOS and Android.",
        actions: [
          { label: "Contact for Mobile App", action: openEmail, icon: <Mail size={16} /> },
          { label: "View Tech Skills", action: () => navigateToPage('about'), icon: <Code size={16} /> },
          { label: "See Projects", action: () => navigateToPage('projects'), icon: <ExternalLink size={16} /> }
        ]
      };
    }

    // API development
    if (msg.includes('api') || msg.includes('backend') || msg.includes('server') || msg.includes('database') || msg.includes('rest') || msg.includes('graphql')) {
      updateUserContext(message, 'api');
      return {
        text: "🔧 Michael provides API development and backend services using Node.js, Express, and various databases. He builds scalable REST APIs, GraphQL endpoints, and robust server architectures.",
        actions: [
          { label: "Discuss API Project", action: openEmail, icon: <Mail size={16} /> },
          { label: "View Skills", action: () => navigateToPage('about'), icon: <Code size={16} /> },
          { label: "Contact Michael", action: () => navigateToPage('contact'), icon: <Phone size={16} /> }
        ]
      };
    }

    // Cloud services
    if (msg.includes('cloud') || msg.includes('aws') || msg.includes('azure') || msg.includes('deployment') || msg.includes('hosting') || msg.includes('devops')) {
      updateUserContext(message, 'cloud');
      return {
        text: "☁️ Michael offers cloud deployment and DevOps services using AWS, Azure, and modern deployment pipelines. He handles server setup, CI/CD, monitoring, and scalable cloud architectures.",
        actions: [
          { label: "Cloud Consultation", action: openEmail, icon: <Mail size={16} /> },
          { label: "View Experience", action: () => navigateToPage('resume'), icon: <Download size={16} /> },
          { label: "Discuss Project", action: () => navigateToPage('contact'), icon: <Phone size={16} /> }
        ]
      };
    }

    // UI/UX design
    if (msg.includes('design') || msg.includes('ui') || msg.includes('ux') || msg.includes('figma') || msg.includes('prototype') || msg.includes('wireframe')) {
      updateUserContext(message, 'design');
      return {
        text: "🎨 Michael provides UI/UX design services creating intuitive, modern interfaces. He works with Figma, creates prototypes, wireframes, and ensures excellent user experiences across all devices.",
        actions: [
          { label: "Design Consultation", action: openEmail, icon: <Mail size={16} /> },
          { label: "View Portfolio", action: () => navigateToPage('projects'), icon: <ExternalLink size={16} /> },
          { label: "Contact Designer", action: () => navigateToPage('contact'), icon: <Phone size={16} /> }
        ]
      };
    }

    // Consulting services
    if (msg.includes('consulting') || msg.includes('consultation') || msg.includes('advice') || msg.includes('strategy') || msg.includes('planning') || msg.includes('architecture')) {
      updateUserContext(message, 'consulting');
      return {
        text: "💡 Michael offers technical consulting services for project planning, architecture design, technology selection, and development strategy. He helps businesses make informed technical decisions.",
        actions: [
          { label: "Book Consultation", action: openEmail, icon: <Mail size={16} /> },
          { label: "View Expertise", action: () => navigateToPage('about'), icon: <Brain size={16} /> },
          { label: "Contact Now", action: () => navigateToPage('contact'), icon: <Phone size={16} /> }
        ]
      };
    }

    // Maintenance and support
    if (msg.includes('maintenance') || msg.includes('support') || msg.includes('bug fix') || msg.includes('update') || msg.includes('upgrade') || msg.includes('optimization')) {
      updateUserContext(message, 'maintenance');
      return {
        text: "🔧 Michael provides ongoing maintenance and support services including bug fixes, performance optimization, security updates, and feature enhancements for existing applications.",
        actions: [
          { label: "Support Request", action: openEmail, icon: <Mail size={16} /> },
          { label: "Emergency Contact", action: () => navigateToPage('contact'), icon: <Phone size={16} /> },
          { label: "View Services", action: () => navigateToPage('about'), icon: <Code size={16} /> }
        ]
      };
    }

    // Advanced help with personalization
    if (msg.includes('help') || msg.includes('what can you do') || msg.includes('capabilities') || msg.includes('services')) {
      const helpText = `🧠 I can help you explore Michael's services: Web Development, Mobile Apps, API Development, Cloud Services, UI/UX Design, Technical Consulting, and Maintenance Support. ${userContext.conversationHistory.length > 0 ? `So far we've discussed ${userContext.askedAbout.join(', ')}.` : 'What service interests you most?'}`;
      
      return {
        text: helpText,
        actions: [
          { label: "All Services", action: () => navigateToPage('about'), icon: <Code size={16} /> },
          { label: "Get Quote", action: openEmail, icon: <Mail size={16} /> },
          { label: "View Portfolio", action: () => navigateToPage('projects'), icon: <ExternalLink size={16} /> }
        ]
      };
    }
    
    // Intelligent fallback with context
    const fallbackText = userContext.conversationHistory.length > 0 
      ? `${userContext.name ? userContext.name + ', ' : ''}I understand you're looking for more information! ${userContext.interests.length > 0 ? `Based on your interest in ${userContext.interests.slice(0,2).join(' and ')}, ` : ''}try asking about Michael's projects, skills, education, or how to contact him. I'm here to provide personalized help!`
      : "🤔 I'm here to help you explore Michael's portfolio with intelligent, personalized assistance! Ask me about his projects, skills, education, or how to contact him. I'll learn from our conversation to help you better!";
    
    return { text: fallbackText };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getPersonalizedResponse(userInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        hasActions: !!response.actions,
        actions: response.actions,
        context: `Conversation: ${userContext.conversationHistory.length + 1} messages`
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-white hover:bg-gray-100 text-black rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 border border-gray-200"
      >
        {isOpen ? <X size={28} /> : <Brain size={28} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-black/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 flex flex-col z-40 overflow-hidden">
          <div className="bg-white/10 backdrop-blur-lg p-4 border-b border-white/20">
            <h3 className="font-bold text-lg flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Brain size={20} />
              </div>
              AI Assistant
              <div className="ml-auto flex items-center gap-2">
                <Sparkles size={16} className="text-white" />
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </h3>
            {userContext.name && (
              <p className="text-xs text-gray-300 mt-1">Chatting with {userContext.name}</p>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs ${
                  message.isBot 
                    ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20' 
                    : 'bg-white text-black'
                } px-4 py-3 rounded-2xl`}>
                  <p className="text-sm leading-relaxed mb-2">{message.text}</p>
                  {message.hasActions && message.actions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={action.action}
                          className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs transition-all duration-200 hover:scale-105"
                        >
                          {action.icon}
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/20">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="text-xs text-gray-300">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-white/20">
            <div className="flex gap-3 items-end">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 border border-white/20 rounded-xl focus:outline-none focus:border-white bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 text-sm transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-12 h-12 bg-white hover:bg-gray-100 disabled:bg-gray-600 text-black disabled:text-gray-400 rounded-xl transition-all duration-200 flex items-center justify-center hover:scale-105 disabled:hover:scale-100"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;