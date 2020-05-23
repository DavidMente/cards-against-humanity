import path from "path";
import fs from "fs";

class QuestionsAnswersRepository {

  private readonly questions: string[];
  private readonly answers: string[];

  constructor() {
    this.questions = QuestionsAnswersRepository.fileToArray(path.resolve('src/repositories/cah/questions.txt'));
    this.answers = QuestionsAnswersRepository.fileToArray(path.resolve('src/repositories/cah/answers.txt'));
  }

  private static fileToArray(filename: string): string[] {
    return fs.readFileSync(filename, 'utf8')
      .toString().split('\n')
      .filter((text) => text.length > 0);
  }

  public getQuestion(): string {
    return QuestionsAnswersRepository.getRandomString(this.questions)
  }

  public getAnswers(answerCount: number): string[] {
    const answers: string[] = [];
    while (answers.length < answerCount) {
      let answer = QuestionsAnswersRepository.getRandomString(this.answers);
      if (!answers.includes(answer)) {
        answers.push(answer);
      }
    }
    return answers;
  }

  private static getRandomString(array: string[]): string {
    return array[Math.round(Math.random() * array.length)];
  }

}

export const questionsAnswersRepository = new QuestionsAnswersRepository();
