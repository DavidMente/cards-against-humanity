import Game from "../models/Game";
import Player, {PlayerStatus} from "../models/Player";
import {GameRepository} from "../repositories/GameRepository";

abstract class GameService {

  protected abstract createGame(id: string): Game;
  protected abstract gameRepository: GameRepository;

  public createGameWithPlayer(playerName: string, userId: string): Game {
    const newId = this.gameRepository.getGames.length + 100;
    const newGame = this.createGame(newId.toString());
    GameService.addNewPlayerToGame(userId, playerName, newGame);
    this.gameRepository.addGame(newGame);
    return newGame;
  }

  protected setPlayersNotReady(game: Game): void {
    game.players = game.players.map((player) => ({...player, status: PlayerStatus.NOT_READY}));
  }

  public joinGame(game: Game, playerName: string, userId: string): void {
    if (game !== undefined) {
      GameService.addNewPlayerToGame(userId, playerName, game);
    }
  }

  public findPlayerByUserId(players: Player[], userId: string): Player | undefined {
    return players.find((player) => player.userId === userId);
  }

  private static addNewPlayerToGame(userId: string, playerName: string, game: Game): void {
    const newPlayer = new Player(userId, playerName);
    game.addPlayer(newPlayer);
  }

}

export default GameService;
