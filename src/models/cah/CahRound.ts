import CahAnswer from "./CahAnswer";

class CahRound {

  public number: number;
  public question: string;
  public answers: CahAnswer[];

  constructor(question: string, answers: CahAnswer[], number: number) {
    this.number = number;
    this.question = question;
    this.answers = answers;
  }

}

export default CahRound
