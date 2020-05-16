import express from "express";
import morganLogger from 'morgan';
import bodyParser from "body-parser";
import WebSocket from 'ws';
import path from "path";
import {logger} from "./logger";
import WebSocketRouter from "./routes/WebSocketRouter";
import {Server} from "http";

const http = require('http');

class App {

  private readonly app: express.Application;
  private readonly port: string | number;
  private readonly webSocketServer: WebSocket.Server;
  private readonly httpServer: Server;

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.port = process.env.PORT || 5000;
    this.webSocketServer = new WebSocket.Server({server: this.httpServer});
    this.initializeMiddlewares();
    this.initializeHtmlRoutes();
  }

  public listen(): void {
    this.httpServer.listen(this.port, () => {
      logger.info(`🚀 App listening on port ${this.port}`);
    });
  }

  public startWebSocketServer(): void {
    new WebSocketRouter(this.webSocketServer);
    logger.info(`Started webSocketServer`);
  }

  public getWebSocketServer(): WebSocket.Server {
    return this.webSocketServer;
  }

  private initializeHtmlRoutes(): void {
    this.app.use(express.static(path.join(__dirname, 'client', 'build')));
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(morganLogger('dev'));
    this.app.use(bodyParser.json());
  }

}

export default App
