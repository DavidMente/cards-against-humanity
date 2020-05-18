import Game, {GameStatus} from "../models/Game";
import Player, {PlayerStatus} from "../models/Player";
import * as WebSocket from "ws";
import Round from "../models/Round";

class GameDto {

  id: string;
  status: GameStatus;
  players: PlayerDto[];
  previousRound: Round | null;
  currentRound: Round | null;

  constructor(game: Game, ws: WebSocket) {
    this.id = game.id;
    this.status = game.status;
    this.players = game.players.map((player) => new PlayerDto(player, ws));
    this.previousRound = game.previousRound;
    this.currentRound = game.currentRound;
    if (game.currentRound !== null) {
      this.currentRound = {
        ...game.currentRound,
        answers: game.currentRound.answers.map((answer) => ({...answer, votes: []}))
      }
    }
  }
}

class PlayerDto {
  id: string;
  name: string;
  points: number;
  secret: string | null;
  status: PlayerStatus;

  constructor(player: Player, ws: WebSocket) {
    this.id = player.id;
    this.name = player.name;
    this.points = player.points;
    const authenticated = ws === player.socket;
    this.secret = authenticated ? player.secret : null;
    this.status = player.status;
  }

}

export default GameDto
