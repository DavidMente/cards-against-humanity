import {GameStatus} from "../../models/Game";
import {PlayerDto} from "../PlayerDto";
import {GameDto} from "../GameDto";
import DrawRound from "../../models/draw/DrawRound";
import DrawGame from "../../models/draw/DrawGame";
import DrawPlayerDto from "./DrawPlayerDto";

class DrawGameDto implements GameDto {

  id: string;
  status: GameStatus;
  players: PlayerDto[];
  previousRound: DrawRound | null;
  currentRound: DrawRound | null;

  constructor(game: DrawGame, userId: string) {
    this.id = game.id;
    this.status = game.status;
    this.players = game.players.map((player) => new DrawPlayerDto(player));
    this.previousRound = game.previousRound;
    this.currentRound = game.currentRound;
  }

}

export default DrawGameDto
