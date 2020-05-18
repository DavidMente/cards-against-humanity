import {GameStatus} from "../models/Game";
import Player, {PlayerStatus} from "../models/Player";
import Round from "../models/cah/Round";
import CahGame from "../models/cah/CahGame";
import {PlayerDto} from "./PlayerDto";
import {GameDto} from "./GameDto";

class CahGameDto implements GameDto {

  id: string;
  status: GameStatus;
  players: PlayerDto[];
  previousRound: Round | null;
  currentRound: Round | null;

  constructor(game: CahGame) {
    this.id = game.id;
    this.status = game.status;
    this.players = game.players.map((player) => new CahPlayerDto(player));
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

class CahPlayerDto implements PlayerDto {
  id: string;
  name: string;
  points: number;
  status: PlayerStatus;

  constructor(player: Player) {
    this.id = player.id;
    this.name = player.name;
    this.points = player.points;
    this.status = player.status;
  }

}

export default CahGameDto
