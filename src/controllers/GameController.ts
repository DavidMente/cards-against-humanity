import WebSocket from "ws";
import {CreateGame, JoinGame, LoadGame, StartGame} from "../routes/webSocketParser";
import MessageDto from "../dto/MessageDto";
import GameService from "../services/GameService";
import {GameDto} from "../dto/GameDto";
import UserRepository, {userRepository} from "../repositories/UserRepository";
import User from "../models/User";
import ExceptionController from "./ExceptionController";
import GameRepository from "../repositories/GameRepository";
import Game from "../models/Game";

abstract class GameController<T extends Game> {

  protected abstract GAME_LOADED: string;
  protected abstract GAME_CREATED: string;
  protected abstract gameService: GameService<T>;
  protected abstract gameRepository: GameRepository<T>;
  protected userRepository: UserRepository = userRepository;

  public createGame = (ws: WebSocket, request: CreateGame): void => {
    const user = this.userRepository.getUserByWebSocket(ws);
    const game = this.gameService.createGameWithPlayer(request.payload.playerName, user.id);
    this.response(this.GAME_CREATED, user, game);
  };

  public loadGame = (ws: WebSocket, request: LoadGame): void => {
    try {
      const user = this.userRepository.getUserByWebSocket(ws);
      const game = this.gameRepository.findGameById(request.payload.gameId);
      this.response(this.GAME_LOADED, user, game);
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

  protected start(game: T) {
    game.start();
  }

  protected sendUpdateToPlayers(game: T): void {
    const users = game.players
      .map((player) => this.userRepository.getUserById(player.userId))
      .filter((user) => user !== undefined);
    users.forEach((user) => this.response(this.GAME_LOADED, user!, game))
  }

  public response(action: string, user: User, game: T): void {
    const gameDto = this.gameToDto(game, user.id);
    const payload = new MessageDto(action, gameDto);
    user.socket.send(JSON.stringify(payload));
  }

  abstract gameToDto(game: T, userId: string): GameDto

}

export default GameController
