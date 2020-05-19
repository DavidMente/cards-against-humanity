import './loadEnv';
import App from "./App";

const app = new App();

app.listen();
app.setupWebSocketServer();
