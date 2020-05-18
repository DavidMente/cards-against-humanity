import Answer from "./Answer";

class Round {

  public number: number;
  public question: string;
  public answers: Answer[];

  constructor(question: string, answers: Answer[], number: number = 0) {
    this.number = number;
    this.question = question;
    this.answers = answers;
  }

}

export default Round
