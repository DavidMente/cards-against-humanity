import React, {FunctionComponent, useState} from "react";
import {Answer, VOTE} from "../store/game/types";
import {send} from "@giantmachines/redux-websocket/dist";
import {connect, ConnectedProps} from "react-redux";

const mapDispatch = {
  sendVote: (gameId: string, index: number) => send({action: VOTE, payload: {gameId: gameId, answer: index}})
};

const connector = connect(null, mapDispatch);

type AnswerComponentProps = {
  answer: Answer,
  index: number,
  gameId: string,
  canPick: boolean,
  isWinningAnswer: boolean,
} & ConnectedProps<typeof connector>

const AnswerComponent: FunctionComponent<AnswerComponentProps> =
  ({answer, canPick, gameId, index, isWinningAnswer, sendVote}) => {

    const [clicked, setClicked] = useState(false);

    function vote() {
      if (canPick) {
        setClicked(true);
        sendVote(gameId, index);
      }
    }

    return <div
      className={'box ' + (isWinningAnswer ? ' winning-answer' : '') + (canPick ? ' selectable-answer' : '') + (clicked ? ' selected-answer' : '')}
      onClick={() => vote()}
    >
      <div dangerouslySetInnerHTML={{__html: answer.text}} />
      {answer.votes.map((vote) =>
        <span key={vote.id}
              className={'player-tag tag' + (isWinningAnswer ? ' is-primary' : ' is-danger')}>{vote.name}</span>)}
    </div>;
  };

export default connector(AnswerComponent);
