import GameRepository from "../GameRepository";
import DrawGame from "../../models/draw/DrawGame";

class DrawGameRepository extends GameRepository<DrawGame> {
  protected games: DrawGame[] = [];

  protected newGame(id: string): DrawGame {
    return new DrawGame(id);
  }

}

export default DrawGameRepository;

export const drawGameRepository = new DrawGameRepository();
