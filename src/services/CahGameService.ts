import CahGame from "../models/cah/CahGame";
import Answer from "../models/cah/Answer";
import Round from "../models/cah/Round";
import Game from "../models/Game";
import GameService from "./GameService";
import {cahGameRepository} from "../repositories/CahGameRepository";
import {questionsAnswersRepository} from "../repositories/QuestionsAnswersRepository";

class CahGameService extends GameService {

  public static ANSWER_COUNT: number = 4;
  protected gameRepository = cahGameRepository;
  private questionsAnswerRepository = questionsAnswersRepository;

  constructor() {
    super();
  }

  public createNewRound(game: CahGame): CahGame {
    const question = this.questionsAnswerRepository.getQuestion();
    const answers = this.questionsAnswerRepository.getAnswers(CahGameService.ANSWER_COUNT).map((answer) => new Answer(answer));
    const roundNumber = game.previousRound === null ? 1 : game.previousRound.number + 1;
    game.currentRound = new Round(question, answers, roundNumber);
    return game;
  }

  public processCurrentRound(game: CahGame): void {
    const winningAnswer = this.determineWinningAnswer(game);
    if (winningAnswer !== null) {
      winningAnswer.isWinner = true;
      this.addPointsForWinningAnswer(game, winningAnswer);
    }
    game.previousRound = game.currentRound;
    game.currentRound = null;
    this.setPlayersNotReady(game);
  }

  private determineWinningAnswer(game: CahGame): Answer | null {
    const round = game.currentRound!;
    const voteCounts = round.answers.map((answer) => answer.votes.length);
    let max = 0, winningIndex = null;
    voteCounts.forEach((count, index) => {
      if (count > max) {
        max = count;
        winningIndex = index;
      } else if (count === max) {
        winningIndex = null;
      }
    });
    if (winningIndex !== null) {
      return round.answers[winningIndex];
    } else {
      return null;
    }
  }

  private addPointsForWinningAnswer(game: CahGame, winningAnswer: Answer) {
    winningAnswer.votes.forEach((vote) => {
      const player = game.players.find((player) => player.userId === vote.id);
      if (player !== undefined) {
        player.points++
      }
    })
  }
}

export default CahGameService;
