import {gameService} from "../services/GameService";
import * as WebSocket from "ws";
import {CreateGame, JoinGame, LoadGame, StartGame, Vote} from "../routes/webSocketParser";
import Game from "../models/Game";
import GameDto from "../dto/GameDto";
import {PlayerStatus} from "../models/Player";
import MessageDto from "../dto/MessageDto";

class GameController {

  static GAME_LOADED = 'GAME_LOADED';
  static GAME_CREATED = 'GAME_CREATED';
  private gameService = gameService;

  public createGame = (ws: WebSocket, request: CreateGame): void => {
    const game = this.gameService.createGame(request.payload.playerName, ws);
    GameController.response(GameController.GAME_CREATED, ws, game);
  };

  public loadGame = (ws: WebSocket, request: LoadGame): void => {
    const game = this.gameService.findGameById(request.payload.gameId);
    const secret = request.payload.secret;
    if (secret !== null) {
      this.reconnectWebSocket(secret, game, ws);
    }
    GameController.response(GameController.GAME_LOADED, ws, game);
  };

  private reconnectWebSocket(secret: string | null, game: Game, ws: WebSocket) {
    game.players.forEach((player) => {
      if (player.secret === secret) {
        player.socket = ws;
      }
    })
  }

  public joinGame = (ws: WebSocket, request: JoinGame): void => {
    const game = this.gameService.joinGame(request.payload.gameId, request.payload.playerName, ws);
    game.update();
  };

  public vote = (ws: WebSocket, request: Vote): void => {
    const game = this.gameService.findGameById(request.payload.gameId);
    const player = this.gameService.findPlayerBySocket(game.players, ws);
    if (player !== undefined && player.status === PlayerStatus.NOT_READY && game.currentRound !== null) {
      player.status = PlayerStatus.READY;
      const answer = game.currentRound.answers
        .find((answer, index) => index === request.payload.answer);
      if (answer !== undefined) {
        answer.votes = [...answer.votes, {id: player.id, name: player.name}];
      }
    }
    const playersReady = game.players.filter((player) => player.status === PlayerStatus.READY).length === game.players.length;
    if (playersReady) {
      this.gameService.processCurrentRound(game);
      game.update();
      this.gameService.createNewRound(game);
      setTimeout(() => game.update(), 5000);
    } else {
      game.update();
    }
  };

  public startGame = (ws: WebSocket, request: StartGame): void => {
    const game = this.gameService.findGameById(request.payload.gameId);
    const player = this.gameService.findPlayerBySocket(game.players, ws);
    if (player !== undefined) {
      game.start();
      this.gameService.createNewRound(game);
    }
    game.update();
  };

  public static response(action: string, ws: WebSocket, game: Game): void {
    const gameDto = new GameDto(game, ws);
    const payload = new MessageDto(action, gameDto);
    ws.send(JSON.stringify(payload));
  }
}

export default GameController
