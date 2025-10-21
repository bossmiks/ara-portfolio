# 🚀 Portfolio Backend Setup Guide

Simple guide to set up the backend API for Michael Ara's portfolio website.

## 📋 What You Get

### ✅ **Simple Backend API**
- **Express.js** server with TypeScript
- **Contact Form API** with email notifications
- **Chatbot API** with AI responses
- **Email Service** with auto-responders

### 🔧 **Features**
- 📧 **Contact Form**: Submit contact messages with email notifications
- 🤖 **Chatbot**: AI-powered responses with context
- 📨 **Email Notifications**: Auto-responders and admin alerts
- 🛡️ **Security**: CORS, input validation

## 🚀 Quick Start

### 1. **Start the Backend Server**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
copy env.example .env

# Start development server
npm run dev
```

**Backend will run at:** `http://localhost:3001`

### 2. **Configure Environment Variables**

Edit `backend/.env` file:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Email (where contact form messages will be sent)
ADMIN_EMAIL=aramichae19@gmail.com

# CORS Configuration
FRONTEND_URL=http://localhost:8085
```

### 3. **Start the Frontend**

```bash
# In the main project directory
npm run dev
```

**Frontend will run at:** `http://localhost:8085`

## 📡 API Endpoints

### 📧 Contact Form
- `POST /api/contact/submit` - Submit contact form

### 🤖 Chatbot
- `POST /api/chatbot/chat` - Send message to AI
- `GET /api/chatbot/suggestions` - Get chat suggestions
- `GET /api/chatbot/info` - Get chatbot information

### ❤️ Health Check
- `GET /api/health` - Server health status

## 📧 Email Setup (Gmail)

### 1. **Enable 2-Factor Authentication**
- Go to Google Account settings
- Enable 2-Factor Authentication

### 2. **Generate App Password**
- Go to Google Account → Security → App passwords
- Generate a new app password for "Mail"
- Use this password in `EMAIL_PASS`

### 3. **Configure Environment**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

## 📧 Contact Form Setup

### **How it Works**
1. User submits contact form on your website
2. Backend sends notification email to your email
3. Backend sends confirmation email to the user
4. No admin panel needed - all messages go directly to your email

## 🧪 Testing the API

### **1. Health Check**
```bash
curl http://localhost:3001/api/health
```

### **2. Contact Form**
```bash
curl -X POST http://localhost:3001/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

### **3. Chatbot Test**
```bash
curl -X POST http://localhost:3001/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about Michael",
    "sessionId": "test123"
  }'
```

## 🚀 Deployment Options

### **Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy backend
cd backend
vercel --prod
```

### **Option 2: Railway**
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### **Option 3: Heroku**
```bash
# Install Heroku CLI
# Create Procfile in backend/
echo "web: npm start" > Procfile

# Deploy
git push heroku main
```

## 🔧 Development

### **Project Structure**
```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   └── index.ts        # Main server file
├── dist/               # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

### **Available Scripts**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
```

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **JWT**: Secure authentication
- **Input Validation**: Request validation
- **Rate Limiting**: Can be added for production

## 📊 Frontend Integration

The frontend has been updated to use the new backend API:

### **Contact Form**
- Now sends to backend API instead of Firebase
- Includes email notifications to your email
- Auto-responder emails to users

### **Chatbot**
- Uses backend AI service
- Fallback to local responses if backend unavailable
- Enhanced context awareness

## 🐛 Troubleshooting

### **Common Issues**

1. **Port Already in Use**
   ```bash
   # Change port in .env
   PORT=3002
   ```

2. **Email Not Sending**
   - Check Gmail app password
   - Verify EMAIL_USER and EMAIL_PASS
   - Check firewall settings

3. **CORS Errors**
   - Update FRONTEND_URL in .env
   - Check frontend URL matches

4. **Chatbot Issues**
   - Check backend is running
   - Verify API endpoints
   - Check console for errors

### **Debug Mode**
```bash
# Enable debug logging
NODE_ENV=development npm run dev
```

## 📞 Support

For issues or questions:
1. Check server logs in terminal
2. Verify environment variables
3. Test API endpoints with curl
4. Check browser console for frontend errors

---

**🎉 Your portfolio now has a simple backend API!**

**Backend Features:**
- ✅ Contact form with email notifications
- ✅ AI-powered chatbot
- ✅ Email auto-responders
- ✅ No admin panel needed

**Next Steps:**
1. Configure email settings
2. Deploy to production
3. Test contact form and chatbot
