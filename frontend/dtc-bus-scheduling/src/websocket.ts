// src/websocket.ts
const ws = new WebSocket('ws://localhost:3000');  // Update with your WebSocket URL

ws.onmessage = (event) => {
  console.log('Message from server:', event.data);
};

ws.onopen = () => {
  console.log('WebSocket connection established');
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};

export default ws;
