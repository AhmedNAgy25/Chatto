# Chatto - Real-time Chat Application

A modern real-time chat application built with React, Node.js, Socket.IO, and MongoDB.

## 🚀 Live Demo

Visit: [https://chatto-app.onrender.com](https://chatto-app.onrender.com)

## ✨ Features

- **Real-time messaging** with Socket.IO
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

   Create environment variables in your deployment platform (Render, Vercel, etc.):

   ```env
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   CLIENT_URL=https://your-app-domain.com
   COOKIE_SECRET=your-cookie-secret
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   npm start
   ```

## 🚀 Deployment

### Render (Recommended)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the following:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
4. Add all environment variables
5. Deploy!

### Other Platforms

The app can be deployed on any platform that supports Node.js:

- Vercel
- Railway
- Heroku
- DigitalOcean App Platform

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
└── render.yaml           # Render deployment config
```

## 🔧 Available Scripts

- `npm run build` - Build the client for production
- `npm start` - Start the production server
- `npm run install:all` - Install all dependencies
- `npm run clean` - Clean all build artifacts

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
