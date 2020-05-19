import express from "express";
import morganLogger from 'morgan';
import bodyParser from "body-parser";
import WebSocket from 'ws';
import path from "path";
import {logger} from "./logger";
import WebSocketRouter from "./routes/WebSocketRouter";
import http from 'http';
import * as net from "net";
import {APP_CONFIG} from "./appConfig";
import MessageDto from "./dto/MessageDto";
import AuthenticationService from "./services/AuthenticationService";

class App {

  private readonly app: express.Application;
  private readonly port: string | number;
  private readonly webSocketServer: WebSocket.Server;
  private readonly httpServer: http.Server;

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.port = APP_CONFIG.PORT;
    this.webSocketServer = new WebSocket.Server({noServer: true});
    this.initializeMiddlewares();
    this.initializeHtmlRoutes();
  }

  public listen() {
    this.httpServer.listen(this.port, () => {
      logger.info(`🚀 App listening on port ${this.port}`);
    });
  }

  public getHttpServer(): http.Server {
    return this.httpServer;
  }

  public getWebSocketServer(): WebSocket.Server {
    return this.webSocketServer;
  }

  public setupWebSocketServer(): void {
    this.httpServer.on('upgrade', (request: http.IncomingMessage, socket: net.Socket, head: Buffer) => {
      this.webSocketServer.handleUpgrade(request, socket, head, (ws) => {
        this.handleAuthentication(request, ws);
      });
    });
    new WebSocketRouter(this.webSocketServer);
    logger.info(`Initialized WebSocketServer`);
  }

  private handleAuthentication(request: http.IncomingMessage, ws: WebSocket) {
    const secret = request.headers['sec-websocket-protocol'];
    const user = (new AuthenticationService).authenticate(secret as string | undefined, ws);
    ws.send(JSON.stringify(new MessageDto('AUTHENTICATED', {secret: user.secret})));
    this.webSocketServer.emit('connection', ws, request);
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
