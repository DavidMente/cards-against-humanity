let url: string;

if (process.env.NODE_ENV === 'production') {
  url = 'wss://davids-gaming-app.herokuapp.com';
} else {
  url = 'ws://localhost:5000'
}

let webSocket: WebSocket;
webSocket = connect();

function connect(): WebSocket {
  webSocket = new WebSocket(url);
  webSocket.onclose = () => {
    console.log('attempting to reconnect websocket');
    setTimeout(() => {
      window.location.reload();
    }, 500)
  };
  return webSocket;
}

export function sendMessage(message: object) {
  if (webSocket.readyState === 1) {
    webSocket.send(JSON.stringify(message))
  } else {
    webSocket.onopen = () => webSocket.send(JSON.stringify(message))
  }
}

export default webSocket;
