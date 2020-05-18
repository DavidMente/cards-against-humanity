import CahGame from "../models/cah/CahGame";
import Answer from "../models/Answer";
import Round from "../models/Round";
import path from "path";
import fs from "fs";
import Game from "../models/Game";
import GameService from "./GameService";
import {cahGameRepository} from "../repositories/CahGameRepository";

class CahGameService extends GameService {

  private readonly questions: string[];
  private readonly answers: string[];
  public static ANSWER_COUNT: number = 4;
  protected gameRepository = cahGameRepository;

  constructor() {
    super();
    this.questions = CahGameService.fileToArray(path.resolve('src/services/questions.txt'));
    this.answers = CahGameService.fileToArray(path.resolve('src/services/answers.txt'));
  }

  private static fileToArray(filename: string): string[] {
    return fs.readFileSync(filename, 'utf8')
      .toString().split('\n')
      .filter((text) => text.length > 0);
  }

  public createNewRound(game: CahGame): CahGame {
    const question = this.getQuestion();
    const answers = this.getAnswers().map((answer) => new Answer(answer));
    const roundNumber = game.previousRound === null ? 1 : game.previousRound.number + 1;
    game.currentRound = new Round(question, answers, roundNumber);
    return game;
  }

  public processCurrentRound(game: CahGame): void {
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
      const winningAnswer = round.answers[winningIndex];
      this.addPointsForWinningAnswer(game, winningAnswer);
    }
    game.previousRound = game.currentRound;
    game.currentRound = null;
    this.setPlayersNotReady(game);
  }

  private addPointsForWinningAnswer(game: Game, winningAnswer: Answer) {
    winningAnswer.votes.forEach((vote) => {
      const player = game.players.find((player) => player.id === vote.id);
      if (player !== undefined) {
        player.points++
      }
    })
  }

  private static getRandomString(array: string[]): string {
    return array[Math.round(Math.random() * array.length)];
  }

  private getQuestion(): string {
    return CahGameService.getRandomString(this.questions)
  }

  private getAnswers(): string[] {
    const answers: string[] = [];
    while (answers.length < CahGameService.ANSWER_COUNT) {
      let answer = CahGameService.getRandomString(this.answers);
      if (!answers.includes(answer)) {
        answers.push(answer);
      }
    }
    return answers;
  }

  createGame(id: string): Game {
    return new CahGame(id);
  }

}

export const cahGameService = new CahGameService();
