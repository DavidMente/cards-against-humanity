import Game from "../models/Game";

export interface GameRepository {
  addGame(game: Game): void

  getGames(): Game[]

  findGameById(gameId: string): Game | undefined
}
