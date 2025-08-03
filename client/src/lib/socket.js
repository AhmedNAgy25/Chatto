import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5001";

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.userId = null;
  }

  connect(userId) {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.userId = userId;
    this.socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on("connect", () => {
      console.log("Connected to socket server");
      this.isConnected = true;
      this.socket.emit("user_connected", userId);
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
      this.isConnected = false;
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      this.isConnected = false;
    });

    this.socket.on("reconnect", (attemptNumber) => {
      console.log(
        `Reconnected to socket server after ${attemptNumber} attempts`
      );
      this.isConnected = true;
      if (this.userId) {
        this.socket.emit("user_connected", this.userId);
      }
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.userId = null;
    }
  }

  emit(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    } else {
      console.warn(`Cannot emit ${event}: socket not connected`);
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event) {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  getConnected() {
    return this.isConnected;
  }
}

export const socketService = new SocketService();
