import {GameStatus} from "../models/Game";
import Round from "../models/cah/Round";
import CahGame from "../models/cah/CahGame";
import {PlayerDto} from "./PlayerDto";
import {GameDto} from "./GameDto";
import Answer from "../models/cah/Answer";
import CahPlayerDto from "./CahPlayerDto";

class CahGameDto implements GameDto {

  id: string;
  status: GameStatus;
  players: PlayerDto[];
  previousRound: Round | null;
  currentRound: Round | null;

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

  private filterAnswersByUserId(answers: Answer[], userId: string): Answer[] {
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
