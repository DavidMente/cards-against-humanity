import WebSocket from "ws";
import {Vote} from "../routes/webSocketParser";
import {PlayerStatus} from "../models/Player";
import GameController from "./GameController";
import {cahGameRepository} from "../repositories/CahGameRepository";
import CahGame from "../models/cah/CahGame";
import CahGameDto from "../dto/CahGameDto";
import CahGameService from "../services/CahGameService";
import {userRepository} from "../repositories/UserRepository";

class CahGameController extends GameController {

  protected gameService = new CahGameService();
  protected gameRepository = cahGameRepository;
  protected userRepository = userRepository;

  protected start(game: CahGame) {
    game.start();
    this.gameService.createNewRound(game);
  }

  public vote = (ws: WebSocket, request: Vote): void => {
    const user = this.userRepository.getUserByWebSocket(ws);
    const game = this.gameRepository.findGameById(request.payload.gameId);
    if (game !== undefined) {
      const player = this.gameService.findPlayerByUserId(game.players, user.id);
      if (player !== undefined && player.status === PlayerStatus.NOT_READY && game.currentRound !== null) {
        player.status = PlayerStatus.READY;
        const answer = game.currentRound.answers
          .find((answer, index) => index === request.payload.answer);
        if (answer !== undefined) {
          answer.votes = [...answer.votes, {id: player.userId, name: player.name}];
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

  gameToDto(game: CahGame, userId: string): CahGameDto {
    return new CahGameDto(game, userId);
  }

}

export default CahGameController;
