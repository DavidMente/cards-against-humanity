import Game from "../models/Game";

export interface GameRepository {
  createGame(): Game

  getGames(): Game[]

  findGameById(gameId: string): Game | undefined
}
