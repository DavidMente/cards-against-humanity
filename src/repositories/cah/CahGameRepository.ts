import CahGame from "../../models/cah/CahGame";
import GameRepository from "../GameRepository";

class CahGameRepository extends GameRepository<CahGame> {
  protected games: CahGame[] = [];

  protected newGame(id: string): CahGame {
    return new CahGame(id);
  }

}

export default CahGameRepository;

export const cahGameRepository = new CahGameRepository();
