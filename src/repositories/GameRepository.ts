import Game from "../models/Game";
import NotFoundException from "../exceptions/NotFoundException";

abstract class GameRepository<T extends Game> {

  protected abstract games: T[] = [];

  protected abstract newGame(id: string): T

  public createGame(): T {
    const id = (100 + this.games.length).toString();
    const game = this.newGame(id);
    this.addGame(game);
    return game;
  }

  private addGame(game: T): void {
    this.games = [...this.games, game]
  }

  public findGameById(gameId: string): T {
    const game = this.games.find((game) => game.id === gameId);
    if (game === undefined) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    } else {
      return game;
    }
  }

  public getGames(): T[] {
    return this.games;
  }

}

export default GameRepository
