import CahGame from "../models/cah/CahGame";
import {GameRepository} from "./GameRepository";
import Game from "../models/Game";

class CahGameRepository implements GameRepository {

  private games: CahGame[] = [];

  public addGame(game: CahGame): void {
    this.games = [...this.games, game]
  }

  public findGameById(gameId: string): CahGame | undefined {
    return this.games.find((game) => game.id === gameId);
  }

  getGames(): Game[] {
    return this.games;
  }

}

export const cahGameRepository = new CahGameRepository();
