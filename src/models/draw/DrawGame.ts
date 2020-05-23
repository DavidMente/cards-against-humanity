import Game from "../Game";
import DrawRound from "./DrawRound";

class DrawGame extends Game {

  public currentRound: DrawRound | null = null;
  public previousRound: DrawRound | null = null;

  constructor(id: string) {
    super(id);
  }

}
