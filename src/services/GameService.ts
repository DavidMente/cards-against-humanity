import Game from "../models/Game";
import Player, {PlayerStatus} from "../models/Player";
import * as WebSocket from "ws";
import fs from 'fs';
import Round from "../models/Round";
import Answer from "../models/Answer";
import path from "path";

class GameService {

  private games: Game[];
  private readonly questions: string[];
  private answers: string[];

  constructor(games: Game[] = []) {
    this.games = games;
    this.questions = GameService.fileToArray(path.resolve('src/services/questions.txt'));
    this.answers = GameService.fileToArray(path.resolve('src/services/answers.txt'));
  }

  private static fileToArray(filename: string): string[] {
    return fs.readFileSync(filename, 'utf8').toString().split('\n')
  }

  public createGame(playerName: string, ws: WebSocket): Game {
    const newId = this.games.length + 100;
    const newGame = new Game(newId.toString());
    GameService.addNewPlayerToGame(ws, playerName, newGame);
    this.games = [...this.games, newGame];
    return newGame;
  }

  public processCurrentRound(game: Game): void {
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

  public createNewRound(game: Game): Game {
    const question = this.getQuestion();
    const answers = this.getAnswers().map((answer) => new Answer(answer));
    const roundNumber = game.previousRound === null ? 1 : game.previousRound.number + 1;
    game.currentRound = new Round(question, answers, roundNumber);
    return game;
  }

  private setPlayersNotReady(game: Game): void {
    game.players = game.players.map((player) => ({...player, status: PlayerStatus.NOT_READY}));
  }

  private static getRandomString(array: string[]): string {
    return array[Math.round(Math.random() * array.length)];
  }

  private getQuestion(): string {
    return GameService.getRandomString(this.questions)
  }

  private getAnswers(): string[] {
    return [0, 1, 2, 3].map(() => GameService.getRandomString(this.answers));
  }

  public findGameById(gameId: string): Game {
    const game = this.games.find((game) => game.id === gameId);
    if (game === undefined) {
      return new Game();
    } else {
      return game;
    }
  }

  public joinGame(gameId: string, playerName: string, ws: WebSocket): Game {
    const game = this.findGameById(gameId);
    GameService.addNewPlayerToGame(ws, playerName, game);
    return game;
  }

  public findPlayerBySocket(players: Player[], ws: WebSocket): Player | undefined {
    return players.find((player) => player.socket === ws);
  }

  private static addNewPlayerToGame(ws: WebSocket, playerName: string, game: Game): Game {
    const newPlayer = new Player(ws, playerName);
    game.addPlayer(newPlayer);
    return game;
  }

}

export default GameService;

export const gameService = new GameService();
