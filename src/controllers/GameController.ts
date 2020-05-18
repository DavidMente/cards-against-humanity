import WebSocket from "ws";
import {CreateGame, JoinGame, LoadGame, StartGame} from "../routes/webSocketParser";
import MessageDto from "../dto/MessageDto";
import {userService} from "../services/UserService";
import GameService from "../services/GameService";
import Game from "../models/Game";
import {GameRepository} from "../repositories/GameRepository";
import {GameDto} from "../dto/GameDto";

abstract class GameController {

  static GAME_LOADED = 'GAME_LOADED';
  static GAME_CREATED = 'GAME_CREATED';
  protected abstract gameService: GameService;
  protected abstract gameRepository: GameRepository;

  public createGame = (ws: WebSocket, request: CreateGame): void => {
    const user = userService.getUserByWebSocket(ws);
    const game = this.gameService.createGameWithPlayer(request.payload.playerName, user.id);
    this.response(GameController.GAME_CREATED, ws, game);
  };

  public loadGame = (ws: WebSocket, request: LoadGame): void => {
    const game = this.gameRepository.findGameById(request.payload.gameId);
    if (game !== undefined) {
      this.response(GameController.GAME_LOADED, ws, game);
    }
  };

  public joinGame = (ws: WebSocket, request: JoinGame): void => {
    const user = userService.getUserByWebSocket(ws);
    const game = this.gameRepository.findGameById(request.payload.gameId);
    if (game !== undefined) {
      this.gameService.joinGame(game, request.payload.playerName, user.id);
      this.sendUpdateToPlayers(game);
    }
  };

  public startGame = (ws: WebSocket, request: StartGame): void => {
    const user = userService.getUserByWebSocket(ws);
    const game = this.gameRepository.findGameById(request.payload.gameId);
    if (game !== undefined) {
      const player = this.gameService.findPlayerByUserId(game.players, user.id);
      if (player !== undefined) {
        this.start(game);
        this.sendUpdateToPlayers(game);
      }
    }
  };

  protected start(game: Game) {
    game.start();
  }

  protected sendUpdateToPlayers(game: Game): void {
    const users = game.players
      .map((player) => userService.getUserById(player.userId))
      .filter((user) => user !== undefined);
    users.forEach((user) => this.response(GameController.GAME_LOADED, user!.socket, game))
  }

  public response(action: string, ws: WebSocket, game: Game): void {
    const gameDto = this.gameToDto(game);
    const payload = new MessageDto(action, gameDto);
    ws.send(JSON.stringify(payload));
  }

  abstract gameToDto(game: Game): GameDto

}

export default GameController
