import WebSocket from "ws";
import {Vote} from "../routes/webSocketParser";
import {userService} from "../services/UserService";
import {PlayerStatus} from "../models/Player";
import GameController from "./GameController";
import {cahGameService} from "../services/CahGameService";
import {cahGameRepository} from "../repositories/CahGameRepository";
import CahGame from "../models/cah/CahGame";
import CahGameDto from "../dto/CahGameDto";

class CahGameController extends GameController {

  protected gameService = cahGameService;
  protected gameRepository = cahGameRepository;

  protected start(game: CahGame) {
    game.start();
    this.gameService.createNewRound(game);
  }

  public vote = (ws: WebSocket, request: Vote): void => {
    const user = userService.getUserByWebSocket(ws);
    const game = this.gameRepository.findGameById(request.payload.gameId);
    if (game !== undefined) {
      const player = this.gameService.findPlayerByUserId(game.players, user.id);
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
        this.sendUpdateToPlayers(game);
        this.gameService.createNewRound(game);
        setTimeout(() => this.sendUpdateToPlayers(game), 5000);
      } else {
        this.sendUpdateToPlayers(game);
      }
    }
  };

  gameToDto(game: CahGame): CahGameDto {
    return new CahGameDto(game);
  }

}

export default CahGameController;
