import WebSocket from "ws";
import {CreateGame, JoinGame, LoadGame, StartGame} from "../routes/webSocketParser";
import MessageDto from "../dto/MessageDto";
import GameService from "../services/GameService";
import Game from "../models/Game";
import {GameRepository} from "../repositories/GameRepository";
import {GameDto} from "../dto/GameDto";
import UserRepository from "../repositories/UserRepository";
import User from "../models/User";
import ExceptionController from "./ExceptionController";

abstract class GameController {

  static GAME_LOADED = 'GAME_LOADED';
  static GAME_CREATED = 'GAME_CREATED';
  protected abstract gameService: GameService;
  protected abstract gameRepository: GameRepository;
  protected abstract userRepository: UserRepository;

  public createGame = (ws: WebSocket, request: CreateGame): void => {
    const user = this.userRepository.getUserByWebSocket(ws);
    const game = this.gameService.createGameWithPlayer(request.payload.playerName, user.id);
    this.response(GameController.GAME_CREATED, user, game);
  };

  public loadGame = (ws: WebSocket, request: LoadGame): void => {
    try {
      const user = this.userRepository.getUserByWebSocket(ws);
      const game = this.gameRepository.findGameById(request.payload.gameId);
      this.response(GameController.GAME_LOADED, user, game);
    } catch (exception) {
      ExceptionController.handle(ws, exception);
    }
  };

  public joinGame = (ws: WebSocket, request: JoinGame): void => {
    try {
      const user = this.userRepository.getUserByWebSocket(ws);
      const game = this.gameRepository.findGameById(request.payload.gameId);
      this.gameService.joinGame(game, request.payload.playerName, user.id);
      this.sendUpdateToPlayers(game);
    } catch (exception) {
      ExceptionController.handle(ws, exception);
    }
  };

  public startGame = (ws: WebSocket, request: StartGame): void => {
    try {
      const user = this.userRepository.getUserByWebSocket(ws);
      const game = this.gameRepository.findGameById(request.payload.gameId);
      const player = this.gameService.findPlayerByUserId(game.players, user.id);
      if (player !== undefined) {
        this.start(game);
        this.sendUpdateToPlayers(game);
      }
    } catch (exception) {
      ExceptionController.handle(ws, exception);
    }
  };

  protected start(game: Game) {
    game.start();
  }

  protected sendUpdateToPlayers(game: Game): void {
    const users = game.players
      .map((player) => this.userRepository.getUserById(player.userId))
      .filter((user) => user !== undefined);
    users.forEach((user) => this.response(GameController.GAME_LOADED, user!, game))
  }

  public response(action: string, user: User, game: Game): void {
    const gameDto = this.gameToDto(game, user.id);
    const payload = new MessageDto(action, gameDto);
    user.socket.send(JSON.stringify(payload));
  }

  abstract gameToDto(game: Game, userId: string): GameDto

}

export default GameController
