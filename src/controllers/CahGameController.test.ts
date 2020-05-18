import CahGameController from "./CahGameController";
import WebSocket from "ws";
import {CREATE_GAME, JOIN_GAME, LOAD_GAME} from "../routes/webSocketParser";
import {userService} from "../services/UserService";
import GameController from "./GameController";
import {cahGameRepository} from "../repositories/CahGameRepository";
import CahGame from "../models/cah/CahGame";

describe('CahGameController', () => {

  const cahGameController = new CahGameController();
  const ws = new WebSocket('ws://localhost:5000');
  const user = userService.findOrCreateUser(ws);
  const sendMock = jest.fn();
  ws.send = sendMock;

  afterEach(sendMock.mockReset);
  afterAll(() => ws.close());

  it('should create a new game', () => {
    cahGameController.createGame(ws, {action: CREATE_GAME, payload: {playerName: 'jack'}});

    const response = JSON.parse(sendMock.mock.calls[0]);
    expect(response.action).toEqual(GameController.GAME_CREATED);
  });

  it('should load an existing game', () => {
    const GAME_ID = '999';
    cahGameRepository.addGame(new CahGame(GAME_ID));

    cahGameController.loadGame(ws, {action: LOAD_GAME, payload: {gameId: GAME_ID}});

    const response = JSON.parse(sendMock.mock.calls[0]);
    expect(response.action).toEqual(GameController.GAME_LOADED);
  });

  it('should join an existing game', () => {
    const GAME_ID = '9999';
    const PLAYER_NAME = 'john';
    cahGameRepository.addGame(new CahGame(GAME_ID));

    cahGameController.joinGame(ws, {action: JOIN_GAME, payload: {gameId: GAME_ID, playerName: PLAYER_NAME}});

    const response = JSON.parse(sendMock.mock.calls[0]);
    expect(response.action).toEqual(GameController.GAME_LOADED);
    const game = cahGameRepository.findGameById(GAME_ID);
    expect(game).toBeDefined();
    expect(game!.players).toHaveLength(1);
    expect(game!.players[0].name).toEqual(PLAYER_NAME);
  })

});
