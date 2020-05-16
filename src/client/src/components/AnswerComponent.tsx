import React, {FunctionComponent, useState} from "react";
import {Answer} from "../store/game/types";
import {sendMessage} from "../webSocket";

type AnswerComponentProps = {
  answer: Answer,
  index: number,
  gameId: string,
  canPick: boolean,
  isWinningAnswer: boolean,
}

const AnswerComponent: FunctionComponent<AnswerComponentProps> = ({answer, canPick, gameId, index, isWinningAnswer}) => {

  const [clicked, setClicked] = useState(false);

  function vote() {
    if (canPick) {
      setClicked(true);
      sendMessage({action: 'VOTE', payload: {gameId: gameId, answer: index}})
    }
  }

  return <div
    className={'box ' + (isWinningAnswer ? ' winning-answer' : '') + (canPick ? ' selectable-answer' : '') + (clicked ? ' selected-answer' : '')}
    onClick={() => vote()}
  >
    <div dangerouslySetInnerHTML={{__html: answer.text}} />
    {answer.votes.map((vote) =>
      <span key={vote.id} className={'player-tag tag' + (isWinningAnswer ? ' is-primary' : ' is-danger')}>{vote.name}</span>)}
  </div>;
};

export default AnswerComponent;
