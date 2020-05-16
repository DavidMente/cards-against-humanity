import * as WebSocket from "ws";
import {logger} from "../logger";
import parseMessage, {CREATE_GAME, JOIN_GAME, LOAD_GAME, START_GAME, VOTE} from "./webSocketParser";
import GameController from "../controllers/GameController";

class WebSocketRouter {

  private webSocketServer: WebSocket.Server;
  private gameController = new GameController();

  constructor(webSocketServer: WebSocket.Server) {
    this.webSocketServer = webSocketServer;
    this.setupEventHandling();
  }

  private setupEventHandling(): void {
    this.webSocketServer.on('connection', (ws: WebSocket) => {
      logger.info('user connected');
      ws.on('message', (message) => this.routeMessage(ws, message as string));
    })
  }

  public routeMessage(ws: WebSocket, payload: string): void {
    const parsedMessage = parseMessage(payload);
    logger.info(JSON.stringify(parsedMessage));
    switch (parsedMessage.action) {
      case START_GAME:
        this.gameController.startGame(ws, parsedMessage);
        break;
      case CREATE_GAME:
        this.gameController.createGame(ws, parsedMessage);
        break;
      case LOAD_GAME:
        this.gameController.loadGame(ws, parsedMessage);
        break;
      case JOIN_GAME:
        this.gameController.joinGame(ws, parsedMessage);
        break;
      case VOTE:
        this.gameController.vote(ws, parsedMessage);
        break;
      default:
        logger.warn(`Unhandled action: ${payload}`);
    }
  }

}

export default WebSocketRouter
