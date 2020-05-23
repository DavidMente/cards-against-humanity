export interface PlayerAnswer {
  id: string;
  name: string;
}

class CahAnswer {

  public text: string;
  public votes: PlayerAnswer[] = [];
  public isWinner: boolean = false;

  constructor(text: string) {
    this.text = text;
  }

}

export default CahAnswer
