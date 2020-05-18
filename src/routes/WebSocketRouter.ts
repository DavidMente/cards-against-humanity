import WebSocket from "ws";
import {logger} from "../logger";
import parseMessage, {CREATE_GAME, JOIN_GAME, LOAD_GAME, START_GAME, VOTE} from "./webSocketParser";
import CahGameController from "../controllers/CahGameController";

class WebSocketRouter {

  private webSocketServer: WebSocket.Server;
  private gameController: CahGameController;

  constructor(webSocketServer: WebSocket.Server, gameController: CahGameController = new CahGameController()) {
    this.webSocketServer = webSocketServer;
    this.gameController = gameController;
    this.setupEventHandling();
  }

  private setupEventHandling(): void {
    this.webSocketServer.on('connection', (ws: WebSocket) => {
      ws.on('message', (message) => this.routeMessage(ws, message as string));
    })
  }

  public routeMessage(ws: WebSocket, payload: string): void {
    const parsedMessage = parseMessage(payload);
    if (parsedMessage !== null) {
      switch (parsedMessage.action) {
        case START_GAME:
          return this.gameController.startGame(ws, parsedMessage);
        case CREATE_GAME:
          return this.gameController.createGame(ws, parsedMessage);
        case LOAD_GAME:
          return this.gameController.loadGame(ws, parsedMessage);
        case JOIN_GAME:
          return this.gameController.joinGame(ws, parsedMessage);
        case VOTE:
          return this.gameController.vote(ws, parsedMessage);
        default:
          logger.warn(`Unhandled action: ${payload}`);
      }
    }
  }

}

export default WebSocketRouter
