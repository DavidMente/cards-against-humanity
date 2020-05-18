import CahGameController from "./CahGameController";
import WebSocket from "ws";
import {CREATE_GAME} from "../routes/webSocketParser";
import {userService} from "../services/UserService";
import GameController from "./GameController";

describe('CahGameController', () => {

  const cahGameController = new CahGameController();
  const ws = new WebSocket('ws://localhost:5000');
  userService.findOrCreateUser(ws);
  const sendMock = jest.fn();
  ws.send = sendMock;

  afterAll(() => ws.close());

  it('creates a new game', () => {
    cahGameController.createGame(ws, {action: CREATE_GAME, payload: {playerName: 'jack'}});
    const response = JSON.parse(sendMock.mock.calls[0]);
    expect(response.action).toEqual(GameController.GAME_CREATED);
  })

});
