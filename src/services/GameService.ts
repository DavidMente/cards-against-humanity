import Game from "../models/Game";
import Player, {PlayerStatus} from "../models/Player";
import GameRepository from "../repositories/GameRepository";

abstract class GameService<T extends Game> {

  protected abstract gameRepository: GameRepository<T>;

  public createGameWithPlayer(playerName: string, userId: string): T {
    const newGame = this.gameRepository.createGame();
    this.addNewPlayerToGame(userId, playerName, newGame);
    return newGame;
  }

  protected setPlayersNotReady(game: T): void {
    game.players = game.players.map((player) => ({...player, status: PlayerStatus.NOT_READY}));
  }

  public joinGame(game: T, playerName: string, userId: string): void {
    if (game !== undefined) {
      this.addNewPlayerToGame(userId, playerName, game);
    }
  }

  public findPlayerByUserId(players: Player[], userId: string): Player | undefined {
    return players.find((player) => player.userId === userId);
  }

  private addNewPlayerToGame(userId: string, playerName: string, game: T): void {
    if (!game.players.some((player) => player.userId === userId)) {
      const newPlayer = new Player(userId, playerName);
      game.addPlayer(newPlayer);
    }
  }

}

export default GameService;
