import CahGameController from "./CahGameController";
import WebSocket from "ws";
import {CREATE_GAME, JOIN_GAME, LOAD_GAME, START_GAME, VOTE} from "../routes/webSocketParser";
import GameController from "./GameController";
import {cahGameRepository} from "../repositories/CahGameRepository";
import CahGame from "../models/cah/CahGame";
import {userRepository} from "../repositories/UserRepository";
import Player from "../models/Player";
import {NOT_FOUND} from "../exceptions/NotFoundException";

describe('CahGameController', () => {

  const cahGameController = new CahGameController();
  const ws = new WebSocket('ws://localhost:5000');
  const user = userRepository.findOrCreateUser(ws);
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
    const GAME_ID = cahGameRepository.createGame().id;

    cahGameController.loadGame(ws, {action: LOAD_GAME, payload: {gameId: GAME_ID}});

    const response = JSON.parse(sendMock.mock.calls[0]);
    expect(response.action).toEqual(GameController.GAME_LOADED);
  });

  it('should return NOT_FOUND', () => {
    cahGameController.loadGame(ws, {action: LOAD_GAME, payload: {gameId: 'unknown'}});

    const response = JSON.parse(sendMock.mock.calls[0]);
    expect(response.action).toEqual(NOT_FOUND);
  });

  it('should join an existing game', () => {
    const PLAYER_NAME = 'john';
    const GAME_ID = cahGameRepository.createGame().id;

    cahGameController.joinGame(ws, {action: JOIN_GAME, payload: {gameId: GAME_ID, playerName: PLAYER_NAME}});

    const response = JSON.parse(sendMock.mock.calls[0]);
    expect(response.action).toEqual(GameController.GAME_LOADED);
    const game = cahGameRepository.findGameById(GAME_ID);
    expect(game).toBeDefined();
    expect(game!.players).toHaveLength(1);
    expect(game!.players[0].name).toEqual(PLAYER_NAME);
  });

  it('should process a vote and move to next round', () => {
    const PLAYER_NAME = 'john';
    const game = cahGameRepository.createGame();
    const player = new Player(user.id, PLAYER_NAME);
    game.addPlayer(player);
    cahGameController.startGame(ws, {action: START_GAME, payload: {gameId: game.id}});

    cahGameController.vote(ws, {action: VOTE, payload: {gameId: game.id, answer: 1}});

    expect(game.previousRound!.answers[1].votes.length).toEqual(1);
  });

});
