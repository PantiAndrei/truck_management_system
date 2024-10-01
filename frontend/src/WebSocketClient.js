// frontend/src/WebSocketClient.js

export default class WebSocketClient {
  constructor() {
    this.socketRef = null;
    this.callbacks = {};
    this.connect = this.connect.bind(this);
  }

  connect() {
    this.socketRef = new WebSocket('ws://127.0.0.1:8000/ws/notifications/');

    this.socketRef.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socketRef.onmessage = (e) => {
      const data = JSON.parse(e.data);
      this.callbacks[data.type](data.message);
    };

    this.socketRef.onclose = () => {
      console.log('WebSocket connection closed');
      // Optionally, attempt to reconnect after a delay
      setTimeout(() => {
        this.connect();
      }, 1000);
    };

    this.socketRef.onerror = (err) => {
      console.error('WebSocket error:', err);
    };
  }

  addCallbacks(type, callback) {
    this.callbacks[type] = callback;
  }

  sendMessage(data) {
    if (this.socketRef.readyState === WebSocket.OPEN) {
      this.socketRef.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open. Ready state:', this.socketRef.readyState);
    }
  }
}
