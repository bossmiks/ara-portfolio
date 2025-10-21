# 🚀 Portfolio Backend API

A simple backend API for Michael Ara's portfolio website with Contact Form and Chatbot features.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Email**: Nodemailer
- **Security**: Helmet, CORS
- **Logging**: Morgan

## 📋 Features

### 📧 Contact System
- Contact form submission
- Email notifications to admin
- Auto-responder emails to users
- Form validation

### 🤖 Chatbot API
- AI-powered responses
- Context-aware conversations
- Interactive actions
- Personalized suggestions

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Environment Setup**
```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Build for Production**
```bash
npm run build
npm start
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

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

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Contact Form
- `POST /api/contact/submit` - Submit contact form

### Chatbot
- `POST /api/chatbot/chat` - Send message to AI
- `GET /api/chatbot/suggestions` - Get chat suggestions
- `GET /api/chatbot/info` - Get chatbot information

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **JWT**: Secure authentication
- **Input Validation**: Request validation
- **Rate Limiting**: API rate limiting (can be added)

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate app password
3. Use app password in EMAIL_PASS

### Email Templates
- Contact form notifications
- Auto-responder confirmations
- Admin notifications

## 🚀 Deployment

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Railway
```bash
# Connect GitHub repository
# Add environment variables
# Deploy automatically
```

### Heroku
```bash
# Install Heroku CLI
# Create Procfile
# Deploy
git push heroku main
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Test API endpoints
curl http://localhost:3001/api/health
```

## 📝 Development

### Project Structure
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

### Adding New Features
1. Create route in `src/routes/`
2. Add controller logic
3. Implement service layer
4. Add TypeScript types
5. Update documentation

## 🔧 Configuration

### CORS Settings
Configure allowed origins in `src/index.ts`:
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8085',
  credentials: true
}));
```

### JWT Settings
Configure JWT in environment variables:
```env
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

## 📞 Support

For issues or questions:
1. Check server logs
2. Verify environment variables
3. Test API endpoints
4. Review documentation

---

**Built with ❤️ by Michael Ara**
