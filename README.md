# Chatto - Real-time Chat Application

A modern real-time chat application built with React, Node.js, Socket.IO, and MongoDB.

## 🚀 Live Demo

Visit: [https://chatto-app.vercel.app](https://chatto-app.vercel.app)

## ✨ Features

- **Real-time messaging** with Socket.IO (Note: Limited on Vercel due to serverless)
- **User authentication** with JWT
- **Profile management** with image uploads
- **Online/offline status** tracking
- **Message read receipts**
- **Responsive design** with Tailwind CSS
- **Modern UI** with DaisyUI components

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- DaisyUI
- Socket.IO Client
- Zustand (State Management)
- React Router DOM

### Backend

- Node.js
- Express.js
- Socket.IO
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (Image Uploads)
- bcryptjs (Password Hashing)

## 📦 Installation

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chatto
   ```

2. **Install dependencies**

   ```bash
   npm run install:all
   ```

3. **Environment Variables**

   Create environment variables in your deployment platform (Vercel, etc.):

   ```env
   NODE_ENV=production
   PORT=5001
   MONGODB_URI=mongodb+srv://ahmedlion315:nHQXPzzmwkGrmw4e@cluster0.qbw0ekq.mongodb.net/chat_db?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=eiSIfjaGAG%w3Ag@9saaWA:JFA%3ad7
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=dxe6kdo1d
   CLOUDINARY_API_KEY=379167172771272
   CLOUDINARY_API_SECRET=IO23GfExY99tVe-5Q3ZpqPYOZn4
   CLIENT_URL=https://chatto-app.vercel.app
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   npm start
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**

   ```bash
   vercel
   ```

3. **Set Environment Variables**

   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add all the environment variables listed above

4. **Alternative: Deploy via GitHub**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the configuration
   - Set environment variables in the dashboard

### Other Platforms

The app can be deployed on any platform that supports Node.js:

- Railway
- Heroku
- DigitalOcean App Platform
- Render (requires credit card)

## 📁 Project Structure

```
chatto/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Zustand stores
│   │   └── lib/          # Utilities
│   └── dist/             # Built files
├── server/               # Node.js backend
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   └── middleware/   # Express middleware
│   └── package.json
└── vercel.json           # Vercel deployment config
```

## 🔧 Available Scripts

- `npm run build` - Build the client for production
- `npm start` - Start the production server
- `npm run install:all` - Install all dependencies
- `npm run clean` - Clean all build artifacts

## ⚠️ Important Notes

### Socket.IO Limitations on Vercel

Due to Vercel's serverless architecture, real-time Socket.IO features are limited:

- **Local Development**: Full Socket.IO functionality
- **Vercel Production**: Socket.IO is disabled (serverless limitations)
- **Alternative**: Consider using WebSockets or Server-Sent Events for real-time features

### Recommended Deployment Options

1. **Vercel**: Best for static hosting and API routes
2. **Railway**: Better for full-stack apps with Socket.IO
3. **Render**: Good alternative (requires credit card)
4. **Heroku**: Traditional hosting option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Socket.IO](https://socket.io/) for real-time communication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [DaisyUI](https://daisyui.com/) for UI components
- [Cloudinary](https://cloudinary.com/) for image uploads
- [Vercel](https://vercel.com/) for hosting
