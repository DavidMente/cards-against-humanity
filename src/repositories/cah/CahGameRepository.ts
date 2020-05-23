import CahGame from "../../models/cah/CahGame";
import {GameRepository} from "../GameRepository";
import Game from "../../models/Game";
import NotFoundException from "../../exceptions/NotFoundException";

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

  public findGameById(gameId: string): CahGame {
    const game = this.games.find((game) => game.id === gameId);
    if (game === undefined) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    } else {
      return game;
    }
  }

  public getGames(): Game[] {
    return this.games;
  }

}

export default CahGameRepository;

export const cahGameRepository = new CahGameRepository();
