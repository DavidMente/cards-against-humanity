import React, {FunctionComponent} from "react";

type QuestionComponentProps = {
  question: string
}

const QuestionComponent: FunctionComponent<QuestionComponentProps> = ({question}) =>
  <p className={'title is-4'} dangerouslySetInnerHTML={{__html: question}} />;

export default QuestionComponent
