export interface PlayerAnswer {
  id: string;
  name: string;
}

class Answer {

  public text: string;
  public votes: PlayerAnswer[] = [];
  public isWinner: boolean = false;

  constructor(text: string) {
    this.text = text;
  }

}

export default Answer
