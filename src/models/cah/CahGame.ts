import Game from "../Game";
import Round from "../Round";

class CahGame extends Game {

  public previousRound: Round | null = null;
  public currentRound: Round | null = null;

  constructor(id: string) {
    super(id);
  }
}

export default CahGame;
