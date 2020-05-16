import {getRandomId} from "../utils/getRandomId";
import Player from "./Player";
import GameController from "../controllers/GameController";
import Round from "./Round";

export enum GameStatus {
  WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS',
  RUNNING = 'RUNNING'
}

class Game {

  public id: string;
  public players: Player[] = [];
  public status: GameStatus = GameStatus.WAITING_FOR_PLAYERS;
  public previousRound: Round | null = null;
  public currentRound: Round | null = null;

  constructor(id: string | null = null) {
    this.id = id || getRandomId();
  }

  public addPlayer(player: Player): void {
    this.players = [...this.players, player];
  }

  public start(): void {
    this.status = GameStatus.RUNNING;
  }

  public update(): void {
    this.players.forEach((player) => GameController.response(player.socket, this))
  }

}

export default Game
