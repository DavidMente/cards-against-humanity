import WebSocketRouter from "./WebSocketRouter";
import WebSocket from "ws";
import CahGameController from "../controllers/CahGameController";
import {CREATE_GAME, JOIN_GAME, LOAD_GAME, START_GAME, VOTE} from "./webSocketParser";

jest.mock('../controllers/CahGameController', () => {
  return jest.fn().mockImplementation(() => {
    return {
      startGame: jest.fn(),
      createGame: jest.fn(),
      loadGame: jest.fn(),
      joinGame: jest.fn(),
      vote: jest.fn(),
    };
  });
});

describe('WebSocketRouter', () => {

  const webSocketServer = new WebSocket.Server({noServer: true});
  const ws = new WebSocket('ws://localhost:5000');
  const gameController = new CahGameController();
  const webSocketRouter = new WebSocketRouter(webSocketServer, gameController);

  afterAll(() => {
    webSocketServer.close();
    ws.close();
  });

  it('should route StartGame correctly', () => {
    const message = {action: START_GAME, payload: {gameId: '123'}};
    webSocketRouter.routeMessage(ws, JSON.stringify(message));
    expect(gameController.startGame).toHaveBeenCalled();
  });

  it('should route CreateGame correctly', () => {
    const message = {action: CREATE_GAME, payload: {playerName: 'john'}};
    webSocketRouter.routeMessage(ws, JSON.stringify(message));
    expect(gameController.createGame).toHaveBeenCalled();
  });

  it('should route LoadGame correctly', () => {
    const message = {action: LOAD_GAME, payload: {gameId: '123'}};
    webSocketRouter.routeMessage(ws, JSON.stringify(message));
    expect(gameController.loadGame).toHaveBeenCalled();
  });

  it('should route JoinGame correctly', () => {
    const message = {action: JOIN_GAME, payload: {gameId: '123', playerName: 'sara'}};
    webSocketRouter.routeMessage(ws, JSON.stringify(message));
    expect(gameController.joinGame).toHaveBeenCalled();
  });

  it('should route Vote correctly', () => {
    const message = {action: VOTE, payload: {gameId: '123', answer: 1}};
    webSocketRouter.routeMessage(ws, JSON.stringify(message));
    expect(gameController.vote).toHaveBeenCalled();
  });

});
