import Game from "../Game";
import CahRound from "./CahRound";

class CahGame extends Game {

  public previousRound: CahRound | null = null;
  public currentRound: CahRound | null = null;

  constructor(id: string) {
    super(id);
  }
}

export default CahGame;
