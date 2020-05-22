import React, {FunctionComponent} from "react";
import {Answer, VOTE} from "../../../store/game/types";
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
  isCurrentRound: boolean,
} & ConnectedProps<typeof connector>

const AnswerComponent: FunctionComponent<AnswerComponentProps> =
  ({answer, canPick, gameId, index, sendVote, isCurrentRound}) => {

    function vote() {
      if (canPick) {
        sendVote(gameId, index);
      }
    }

    return <div
      className={'box ' + (answer.isWinner ? ' winning-answer' : '') + (canPick ? ' selectable-answer' : '')}
      onClick={() => vote()}
    >
      <div dangerouslySetInnerHTML={{__html: answer.text}} />
      {answer.votes.map((vote) =>
        <span key={vote.id}
              className={'player-tag tag' + (answer.isWinner ? ' is-primary' : (isCurrentRound ? ' is-warning' : ' is-danger'))}>{vote.name}</span>)}
    </div>;
  };

export default connector(AnswerComponent);
