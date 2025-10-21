import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Download, ExternalLink, Calendar, Code, Mail, Phone, Brain, Sparkles, Cpu, Database } from 'lucide-react';
import { chatbotService, ChatbotRequest, ChatbotResponse } from '@/services/chatbotService';

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
    { id: '1', text: '👋 Kamusta! I\'m your AI assistant, powered by advanced conversation intelligence. I\'m here to help you explore Michael\'s amazing portfolio with a personal touch. What brings you here today?', isBot: true, timestamp: new Date() }
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
    const techKeywords = ['react', 'typescript', 'javascript', 'iot', 'web development', 'frontend', 'backend', 'mobile', 'ai', 'machine learning', 'node.js', 'firebase', 'database', 'arduino', 'esp8266', 'sensors', 'automation', 'smart systems'];
    const found = techKeywords.filter(keyword => 
      message.toLowerCase().includes(keyword) && !currentInterests.includes(keyword)
    );
    return [...currentInterests, ...found];
  };

  const extractTopic = (message: string): string => {
    const msg = message.toLowerCase();
    if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio')) return 'projects';
    if (msg.includes('skill') || msg.includes('tech') || msg.includes('technology')) return 'skills';
    if (msg.includes('contact') || msg.includes('hire') || msg.includes('email')) return 'contact';
    if (msg.includes('education') || msg.includes('academic') || msg.includes('degree')) return 'education';
    if (msg.includes('resume') || msg.includes('cv') || msg.includes('experience')) return 'resume';
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) return 'greeting';
    return 'general';
  };

  const handleAction = (actionType: string, data: string) => {
    switch (actionType) {
      case 'navigate':
        navigateToPage(data.replace('/', ''));
        break;
      case 'external':
        window.open(data, '_blank');
        break;
      case 'email':
        window.open(data, '_blank');
        break;
      case 'download':
        const link = document.createElement('a');
        link.href = data;
        link.download = data.split('/').pop() || 'download';
        link.click();
        break;
      default:
        console.log('Unknown action:', actionType, data);
    }
  };

  const getIconComponent = (iconName?: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Code': <Code size={16} />,
      'Mail': <Mail size={16} />,
      'Phone': <Phone size={16} />,
      'Download': <Download size={16} />,
      'ExternalLink': <ExternalLink size={16} />,
      'Brain': <Brain size={16} />,
      'Sparkles': <Sparkles size={16} />,
      'Calendar': <Calendar size={16} />,
      'Cpu': <Cpu size={16} />,
      'Database': <Database size={16} />
    };
    return iconMap[iconName || 'Code'] || <Code size={16} />;
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
        ? `${userContext.name ? userContext.name + ', ' : ''}Ah, you're back for more projects! 🎯 Michael's portfolio is full of innovative solutions - from IoT systems to modern web apps. ${userContext.interests.length > 0 ? `Since you're into ${userContext.interests.join(', ')}, you'll love his tech-focused projects!` : ''}`
        : "🚀 Wow! Michael's projects are seriously impressive - from smart IoT systems to cutting-edge web applications. His work shows real innovation and technical excellence!";
      
      return {
        text: personalizedText,
        actions: [
          { label: "Explore Projects", action: () => navigateToPage('projects'), icon: <Code size={16} /> },
          { label: "GitHub Profile", action: openGitHub, icon: <ExternalLink size={16} /> },
          { label: "Technical Skills", action: () => navigateToPage('about'), icon: <Brain size={16} /> }
        ]
      };
    }
    
    // Smart skill recommendations
    if (msg.includes('skill') || msg.includes('tech') || msg.includes('technology') || msg.includes('stack')) {
      updateUserContext(message, 'skills');
      const skillText = isReturningVisitor 
        ? `${userContext.name ? userContext.name + ', ' : ''}Michael's skills are legit impressive! 💪 He's got React, TypeScript, IoT development, and modern web tech down pat. ${userContext.interests.includes('react') ? 'Perfect match for your React interest!' : ''} Plus Firebase, Node.js, and seamless device integrations - the guy's got range!`
        : "💻 Michael's skill set is seriously diverse - React, TypeScript, JavaScript, IoT development, and modern web technologies. He creates smart, connected systems that actually work beautifully!";
      
      return {
        text: skillText,
        actions: [
          { label: "Check Skills", action: () => navigateToPage('about'), icon: <Code size={16} /> },
          { label: "Download Resume", action: downloadResume, icon: <Download size={16} /> },
          { label: "See Projects", action: () => navigateToPage('projects'), icon: <Sparkles size={16} /> }
        ]
      };
    }
    
    // Intelligent contact handling
    if (msg.includes('contact') || msg.includes('hire') || msg.includes('email') || msg.includes('reach') || msg.includes('collaborate')) {
      updateUserContext(message, 'contact');
      const contactText = userContext.conversationHistory.some(h => h.includes('project') || h.includes('skill'))
        ? `${userContext.name ? userContext.name + ', ' : ''}Awesome! Since you're interested in Michael's work, he'd be thrilled to chat about potential collaborations or opportunities! 🚀`
        : "📧 Ready to connect with Michael? He's super approachable and always excited to discuss new opportunities, collaborations, and innovative projects!";
      
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
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('start') || msg.includes('kamusta') || msg.includes('mabuhay')) {
      const currentHour = new Date().getHours();
      const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
      
      const greetingText = isReturningVisitor 
        ? `${userContext.name ? `Welcome back, ${userContext.name}!` : 'Welcome back!'} 👋 Ready to dive deeper into Michael's amazing portfolio? ${userContext.interests.length > 0 ? `I remember you're into ${userContext.interests.slice(0,2).join(' and ')} - let's explore more!` : ''}`
        : `👋 ${timeGreeting}! Welcome to Michael's portfolio! I'm your AI assistant with some serious conversation intelligence. I'll learn about your interests as we chat and give you personalized recommendations that actually make sense!`;
      
      return {
        text: greetingText,
        actions: [
          { label: "Explore Projects", action: () => navigateToPage('projects'), icon: <Code size={16} /> },
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

    // Technology discussions
    if (msg.includes('react') || msg.includes('javascript') || msg.includes('typescript') || msg.includes('programming') || msg.includes('coding')) {
      updateUserContext(message, 'programming');
      return {
        text: "💻 Awesome! I love talking about programming! React is fantastic for building modern web apps, and TypeScript adds that extra type safety. JavaScript is the backbone of web development. What specific aspect interests you most?",
        actions: [
          { label: "React Tips", action: () => setInput("Tell me about React best practices"), icon: <Code size={16} /> },
          { label: "TypeScript", action: () => setInput("What are TypeScript benefits?"), icon: <Brain size={16} /> },
          { label: "Web Dev", action: () => setInput("Modern web development trends"), icon: <ExternalLink size={16} /> }
        ]
      };
    }

    // IoT and hardware discussions
    if (msg.includes('arduino') || msg.includes('iot') || msg.includes('sensors') || msg.includes('hardware') || msg.includes('embedded')) {
      updateUserContext(message, 'iot');
      return {
        text: "🔧 IoT is fascinating! Arduino and ESP8266 are perfect for smart projects. Sensors, actuators, and connectivity make everything smarter. Are you working on any IoT projects?",
        actions: [
          { label: "Arduino Tips", action: () => setInput("Arduino programming tips"), icon: <Cpu size={16} /> },
          { label: "IoT Projects", action: () => setInput("Show me IoT projects"), icon: <Code size={16} /> },
          { label: "Sensors", action: () => setInput("What sensors are best for IoT?"), icon: <Brain size={16} /> }
        ]
      };
    }

    // AI and Machine Learning
    if (msg.includes('ai') || msg.includes('artificial intelligence') || msg.includes('machine learning') || msg.includes('ml') || msg.includes('neural')) {
      updateUserContext(message, 'ai');
      return {
        text: "🤖 AI is revolutionizing everything! From machine learning to neural networks, it's changing how we build applications. Are you interested in AI development or just curious about the technology?",
        actions: [
          { label: "AI Development", action: () => setInput("How to start with AI development?"), icon: <Brain size={16} /> },
          { label: "ML Basics", action: () => setInput("Machine learning fundamentals"), icon: <Code size={16} /> },
          { label: "AI Tools", action: () => setInput("Best AI tools for developers"), icon: <ExternalLink size={16} /> }
        ]
      };
    }

    // Database and Backend
    if (msg.includes('database') || msg.includes('sql') || msg.includes('mongodb') || msg.includes('firebase') || msg.includes('backend')) {
      updateUserContext(message, 'database');
      return {
        text: "🗄️ Databases are the backbone of applications! SQL for relational data, NoSQL for flexibility, Firebase for real-time features. What type of data are you working with?",
        actions: [
          { label: "SQL Tips", action: () => setInput("SQL best practices"), icon: <Database size={16} /> },
          { label: "Firebase", action: () => setInput("Firebase features and benefits"), icon: <Code size={16} /> },
          { label: "NoSQL", action: () => setInput("When to use NoSQL databases"), icon: <Brain size={16} /> }
        ]
      };
    }

    // Cloud and DevOps
    if (msg.includes('cloud') || msg.includes('aws') || msg.includes('azure') || msg.includes('docker') || msg.includes('kubernetes') || msg.includes('devops')) {
      updateUserContext(message, 'cloud');
      return {
        text: "☁️ Cloud computing is essential for modern applications! AWS, Azure, Docker, Kubernetes - the cloud ecosystem is vast. Are you looking to deploy or optimize existing applications?",
        actions: [
          { label: "Cloud Basics", action: () => setInput("Cloud computing fundamentals"), icon: <ExternalLink size={16} /> },
          { label: "Docker", action: () => setInput("Docker containerization"), icon: <Code size={16} /> },
          { label: "AWS", action: () => setInput("AWS services overview"), icon: <Brain size={16} /> }
        ]
      };
    }

    // Mobile Development
    if (msg.includes('mobile') || msg.includes('android') || msg.includes('ios') || msg.includes('flutter') || msg.includes('react native')) {
      updateUserContext(message, 'mobile');
      return {
        text: "📱 Mobile development is exciting! React Native for cross-platform, Flutter for beautiful UIs, native development for performance. What platform are you targeting?",
        actions: [
          { label: "React Native", action: () => setInput("React Native development tips"), icon: <Code size={16} /> },
          { label: "Flutter", action: () => setInput("Flutter vs React Native"), icon: <ExternalLink size={16} /> },
          { label: "Mobile UI", action: () => setInput("Mobile UI/UX best practices"), icon: <Brain size={16} /> }
        ]
      };
    }

    // Advanced help with personalization
    if (msg.includes('help') || msg.includes('what can you do') || msg.includes('capabilities') || msg.includes('services')) {
      const helpText = `🧠 I'm your AI assistant and I can help you explore Michael's amazing services: Web Development, Mobile Apps, API Development, Cloud Services, UI/UX Design, Technical Consulting, and Maintenance Support. ${userContext.conversationHistory.length > 0 ? `We've already talked about ${userContext.askedAbout.join(', ')} - what else interests you?` : 'What service catches your eye?'}`;
      
      return {
        text: helpText,
        actions: [
          { label: "All Services", action: () => navigateToPage('about'), icon: <Code size={16} /> },
          { label: "Get Quote", action: openEmail, icon: <Mail size={16} /> },
          { label: "View Portfolio", action: () => navigateToPage('projects'), icon: <ExternalLink size={16} /> }
        ]
      };
    }
    
    // Tech trends and current topics
    if (msg.includes('trend') || msg.includes('latest') || msg.includes('new') || msg.includes('future') || msg.includes('2024') || msg.includes('2025')) {
      updateUserContext(message, 'trends');
      return {
        text: "🚀 Tech trends are exciting! AI integration, edge computing, Web3, and sustainable tech are hot topics. What specific trend interests you? I can discuss the latest in web development, IoT, or emerging technologies!",
        actions: [
          { label: "AI Trends", action: () => setInput("Latest AI trends in 2024"), icon: <Brain size={16} /> },
          { label: "Web Dev", action: () => setInput("Modern web development trends"), icon: <Code size={16} /> },
          { label: "IoT Future", action: () => setInput("Future of IoT technology"), icon: <Cpu size={16} /> }
        ]
      };
    }

    // Programming languages discussion
    if (msg.includes('python') || msg.includes('java') || msg.includes('c++') || msg.includes('go') || msg.includes('rust') || msg.includes('swift')) {
      updateUserContext(message, 'languages');
      return {
        text: "💻 Programming languages are tools for different jobs! Python for AI/ML, Java for enterprise, C++ for performance, Go for concurrency, Rust for safety. What are you building?",
        actions: [
          { label: "Language Comparison", action: () => setInput("Compare programming languages"), icon: <Code size={16} /> },
          { label: "Best Practices", action: () => setInput("Programming best practices"), icon: <Brain size={16} /> },
          { label: "Learning Path", action: () => setInput("How to learn programming"), icon: <ExternalLink size={16} /> }
        ]
      };
    }

    // Career and learning
    if (msg.includes('career') || msg.includes('job') || msg.includes('learn') || msg.includes('study') || msg.includes('course') || msg.includes('tutorial')) {
      updateUserContext(message, 'career');
      return {
        text: "🎓 Tech careers are amazing! Whether you're starting out or leveling up, there's always something new to learn. What area interests you most? I can share insights about different tech paths!",
        actions: [
          { label: "Career Paths", action: () => setInput("Tech career paths and options"), icon: <Brain size={16} /> },
          { label: "Learning Resources", action: () => setInput("Best resources to learn programming"), icon: <Code size={16} /> },
          { label: "Skills Needed", action: () => setInput("Essential skills for developers"), icon: <ExternalLink size={16} /> }
        ]
      };
    }

    // Intelligent fallback with context
    const fallbackText = userContext.conversationHistory.length > 0 
      ? `${userContext.name ? userContext.name + ', ' : ''}Hmm, let me think about that! 🤔 ${userContext.interests.length > 0 ? `Since you're into ${userContext.interests.slice(0,2).join(' and ')}, ` : ''}try asking about Michael's projects, skills, education, or how to contact him. I'm here to help with personalized recommendations!`
      : "🤔 Hey there! I'm here to help you explore Michael's portfolio with some serious AI intelligence! Ask me about his projects, skills, education, or how to contact him. I'll learn from our conversation and give you better recommendations as we chat!";
    
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

    try {
      // Send to n8n webhook
      const request: ChatbotRequest = {
        message: userInput,
        sessionId: `session_${Date.now()}`,
        context: userContext
      };

      const response: ChatbotResponse = await chatbotService.sendMessage(request);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        hasActions: !!response.actions,
        actions: response.actions?.map(action => ({
          label: action.label,
          action: () => handleAction(action.action, action.data || ''),
          icon: getIconComponent(action.icon)
        })),
        context: `Conversation: ${userContext.conversationHistory.length + 1} messages`
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Update user context
      updateUserContext(userInput, extractTopic(userInput));
      
    } catch (error) {
      console.log('Using local chatbot responses (n8n not configured)');
      // Use local intelligent responses
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
      
      // Update user context
      updateUserContext(userInput, extractTopic(userInput));
    } finally {
      setIsTyping(false);
    }
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
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <Brain size={20} />
              </div>
              AI Assistant
              <div className="ml-auto flex items-center gap-2">
                <Sparkles size={16} className="text-white animate-spin" style={{animationDuration: '3s'}} />
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
                    <span className="text-xs text-gray-300 animate-pulse">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-white/20">
            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="mb-3">
                <p className="text-xs text-gray-300 mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {["Show me projects", "What skills?", "Contact info", "Tell me about Michael", "React tips", "IoT projects", "AI trends"].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(suggestion)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-white transition-all duration-200 hover:scale-105"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Dynamic suggestions based on conversation */}
            {messages.length > 1 && userContext.askedAbout.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-300 mb-2">You might also ask:</p>
                <div className="flex flex-wrap gap-2">
                  {userContext.askedAbout.includes('projects') && !userContext.askedAbout.includes('skills') && (
                    <button
                      onClick={() => setInput("What skills does Michael have?")}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-white transition-all duration-200 hover:scale-105"
                    >
                      What skills?
                    </button>
                  )}
                  {userContext.askedAbout.includes('skills') && !userContext.askedAbout.includes('contact') && (
                    <button
                      onClick={() => setInput("How can I contact Michael?")}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-white transition-all duration-200 hover:scale-105"
                    >
                      Contact info
                    </button>
                  )}
                  {!userContext.askedAbout.includes('projects') && (
                    <button
                      onClick={() => setInput("Show me Michael's projects")}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-white transition-all duration-200 hover:scale-105"
                    >
                      Show projects
                    </button>
                  )}
                </div>
              </div>
            )}
            
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