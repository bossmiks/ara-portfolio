# 📧 Email Setup Guide - Para Makakuha ng Contact Messages

## 🔧 **Problem:** 
Hindi ka nakakatanggap ng email dahil hindi pa naka-configure ang Gmail app password.

## ✅ **Solution:** Gmail App Password Setup

### **Step 1: Enable 2-Factor Authentication**
1. **Pumunta sa Google Account:** https://myaccount.google.com/
2. **Security** → **2-Step Verification**
3. **Enable 2-Step Verification** (kailangan ito para sa app password)

### **Step 2: Generate App Password**
1. **Pumunta sa:** https://myaccount.google.com/apppasswords
2. **Select app:** "Mail"
3. **Select device:** "Other (custom name)"
4. **Type:** "Portfolio Backend"
5. **Click "Generate"**
6. **Copy the 16-character password** (example: `abcd efgh ijkl mnop`)

### **Step 3: Update Backend Configuration**
1. **Open:** `backend/.env` file
2. **Replace:** `EMAIL_PASS=test123`
3. **With:** `EMAIL_PASS=your-16-character-app-password`

### **Step 4: Restart Backend**
```bash
cd backend
npm run dev
```

## 🧪 **Test Email Sending:**

### **Method 1: Contact Form**
1. **Go to:** `http://localhost:8086/contact`
2. **Fill out form**
3. **Submit message**
4. **Check your email inbox**

### **Method 2: API Test**
```bash
curl -X POST http://localhost:3001/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test Message","message":"This is a test message"}'
```

## 📧 **What You'll Receive:**

### **1. Notification Email (to you):**
- **Subject:** "New Contact: [Subject]"
- **Content:** Name, email, subject, message
- **From:** Portfolio Backend

### **2. Confirmation Email (to user):**
- **Subject:** "Thank you for contacting Michael Ara"
- **Content:** Thank you message
- **From:** Portfolio Backend

## 🚨 **Common Issues:**

### **"Invalid login" Error:**
- **Problem:** Wrong app password
- **Solution:** Generate new app password

### **"Less secure app access" Error:**
- **Problem:** 2FA not enabled
- **Solution:** Enable 2-Step Verification first

### **"Authentication failed" Error:**
- **Problem:** Wrong email or password
- **Solution:** Check EMAIL_USER and EMAIL_PASS in .env

## ✅ **Success Indicators:**

### **✅ Backend Logs:**
```
Email sent: <message-id>
Contact notification sent successfully
Contact confirmation sent successfully
```

### **✅ Email Received:**
- **Inbox:** New contact form submission
- **Sent:** Confirmation to user

## 🎯 **Quick Setup:**

1. **Enable 2FA** in Google Account
2. **Generate App Password** for Mail
3. **Update** `backend/.env` with real password
4. **Restart** backend server
5. **Test** contact form

**After setup, you'll receive all contact messages in your email!** 📧✅
