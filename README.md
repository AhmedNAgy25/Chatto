# Chatto - Real-time Chat Application

A modern, real-time chat application built with React, Node.js, Socket.IO, and MongoDB. Features include image sharing, online status indicators, typing indicators, and a Telegram-like chat experience.

## Features

### ✨ Core Features

- **Real-time messaging** with Socket.IO
- **Image sharing** with preview and full-size modal view
- **Online/offline status** with green indicators
- **Typing indicators** showing when users are typing
- **Auto-scroll to bottom** like Telegram
- **User authentication** with JWT
- **Profile management** with avatar uploads

### 🎨 UI/UX Features

- **Modern design** with DaisyUI and Tailwind CSS
- **Responsive layout** that works on desktop and mobile
- **Dark/Light theme** support
- **Smooth animations** and transitions
- **Loading skeletons** for better UX
- **Toast notifications** for user feedback

### 🔒 Security Features

- **JWT authentication** with secure cookies
- **Password hashing** with bcrypt
- **Input validation** and sanitization
- **File upload restrictions** (5MB limit for images)

## Tech Stack

### Frontend

- **React 19** with Vite
- **Zustand** for state management
- **Socket.IO Client** for real-time communication
- **Tailwind CSS** + **DaisyUI** for styling
- **Lucide React** for icons
- **React Hot Toast** for notifications

### Backend

- **Node.js** with Express
- **Socket.IO** for real-time features
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Cloudinary** for image storage
- **bcryptjs** for password hashing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chatto
   ```

2. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**

   Create `.env` file in the server directory:

   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**

   ```bash
   # Start the server (from server directory)
   npm run dev

   # Start the client (from client directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5001

## Features in Detail

### Image Sharing

- Click the image icon to select an image
- Preview the image before sending
- Click on sent images to view in full size
- 5MB file size limit
- Supports common image formats (JPEG, PNG, GIF, WebP)

### Online Status

- Green dot indicators show online users
- Real-time updates when users come online/offline
- "Show online only" filter in sidebar
- Animated pulse effect for online indicators

### Typing Indicators

- Shows "typing..." when someone is typing
- Automatically stops after 1 second of inactivity
- Real-time updates across all connected clients

### Chat Experience

- Messages auto-scroll to bottom like Telegram
- Smooth scrolling animations
- Message timestamps
- Responsive design for all screen sizes

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Messages

- `GET /api/messages/users` - Get all users for sidebar
- `GET /api/messages/:id` - Get messages with a specific user
- `POST /api/messages/send/:id` - Send a message to a user

## Socket.IO Events

### Client to Server

- `user_connected` - User connects to socket
- `send_message` - Send a new message
- `typing_start` - User starts typing
- `typing_stop` - User stops typing

### Server to Client

- `user_online` - User comes online
- `user_offline` - User goes offline
- `online_users` - List of online users
- `new_message` - New message received
- `user_typing` - User is typing
- `user_stop_typing` - User stopped typing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by modern chat applications like Telegram and WhatsApp
- Built with best practices for real-time applications
- Uses modern React patterns and hooks
