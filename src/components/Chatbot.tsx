import React, { useState } from 'react';
import { Send, Bot, User, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '👋 Hello! I\'m your AI assistant. I can help you explore this portfolio and answer questions about projects, skills, and experience!', isBot: true, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);

  const quickQuestions = [
    "What are your main skills?",
    "Tell me about your projects",
    "How can I contact you?"
  ];

  const getResponse = (message: string): string => {
    const msg = message.toLowerCase();
    
    if (msg.includes('project') || msg.includes('work')) {
      return "I've worked on various projects including React applications, TypeScript development, and modern web technologies. Check out my Projects page for details!";
    }
    if (msg.includes('skill') || msg.includes('tech')) {
      return "I specialize in React, TypeScript, JavaScript, and modern web development. I also work with Firebase, Tailwind CSS, and various other technologies.";
    }
    if (msg.includes('contact') || msg.includes('hire') || msg.includes('email')) {
      return "You can reach me through the Contact page or check out my resume. I'm always open to discussing new opportunities!";
    }
    if (msg.includes('education') || msg.includes('academic')) {
      return "You can find my educational background and certifications on the Academics page. I'm continuously learning and improving my skills.";
    }
    if (msg.includes('resume') || msg.includes('cv')) {
      return "My resume is available on the Resume page where you can view and download it. It contains all my professional experience and skills.";
    }
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return "Hello! Welcome to my portfolio. I can help you learn more about my projects, skills, experience, or how to get in touch with me.";
    }
    
    return "I'm here to help you navigate my portfolio! Ask me about my projects, skills, education, or how to contact me.";
  };

  const handleSend = async (message?: string) => {
    const textToSend = message || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowQuestions(false);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(textToSend),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-white hover:bg-gray-100 text-black rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 border border-gray-200"
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-black/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 flex flex-col z-40 overflow-hidden">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-lg p-4 border-b border-white/20">
            <h3 className="font-bold text-lg flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} />
              </div>
              AI Assistant
              <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs px-4 py-3 rounded-2xl ${
                  message.isBot 
                    ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20' 
                    : 'bg-white text-black'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
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
                    <span className="text-xs text-gray-300">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick Questions */}
            {showQuestions && messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-400 text-center">Quick questions:</p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(question)}
                    className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white text-sm transition-all hover:scale-[1.02]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
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
                onClick={(e) => handleSend()} 
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