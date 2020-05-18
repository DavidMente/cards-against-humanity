import {getRandomId} from "../utils/getRandomId";
import Player from "./Player";

export enum GameStatus {
  WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS',
  RUNNING = 'RUNNING'
}

class Game {

  public id: string;
  public players: Player[] = [];
  public status: GameStatus = GameStatus.WAITING_FOR_PLAYERS;

  constructor(id: string | null = null) {
    this.id = id || getRandomId();
  }

  public addPlayer(player: Player): void {
    this.players = [...this.players, player];
  }

  public start(): void {
    this.status = GameStatus.RUNNING;
  }

}

export default Game
