import Drawing from "./Drawing";

class DrawRound {
  public drawing: Drawing = new Drawing;

  constructor(public userId: string, public number: number) {
  }
}

export default DrawRound;
