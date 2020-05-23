import {GameStatus} from "../../models/Game";
import CahGame from "../../models/cah/CahGame";
import {PlayerDto} from "../PlayerDto";
import {GameDto} from "../GameDto";
import CahPlayerDto from "./CahPlayerDto";
import CahRound from "../../models/cah/CahRound";
import CahAnswer from "../../models/cah/CahAnswer";

class CahGameDto implements GameDto {

  id: string;
  status: GameStatus;
  players: PlayerDto[];
  previousRound: CahRound | null;
  currentRound: CahRound | null;

  constructor(game: CahGame, userId: string) {
    this.id = game.id;
    this.status = game.status;
    this.players = game.players.map((player) => new CahPlayerDto(player));
    this.previousRound = game.previousRound;
    this.currentRound = game.currentRound;
    if (game.currentRound !== null) {
      this.currentRound = {
        ...game.currentRound,
        answers: this.filterAnswersByUserId(game.currentRound.answers, userId)
      }
    }
  }

  private filterAnswersByUserId(answers: CahAnswer[], userId: string): CahAnswer[] {
    return answers.map((answer) => {
      if (answer.votes.some((vote) => vote.id === userId)) {
        return {...answer, votes: answer.votes.filter((vote) => vote.id === userId)}
      } else {
        return {...answer, votes: []}
      }
    })
  }
}

export default CahGameDto
