import CahGame from "../models/cah/CahGame";
import {GameRepository} from "./GameRepository";
import Game from "../models/Game";

class CahGameRepository implements GameRepository {

  private games: CahGame[] = [];

  public createGame(): CahGame {
    const id = (100 + this.games.length).toString();
    const game = new CahGame(id);
    this.addGame(game);
    return game;
  }

  private addGame(game: CahGame): void {
    this.games = [...this.games, game]
  }

  public findGameById(gameId: string): CahGame | undefined {
    return this.games.find((game) => game.id === gameId);
  }

  public getGames(): Game[] {
    return this.games;
  }

}

export default CahGameRepository;

export const cahGameRepository = new CahGameRepository();
