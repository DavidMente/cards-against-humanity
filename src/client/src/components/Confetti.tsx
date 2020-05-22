import React, {FunctionComponent} from "react";
import ReactDomConfetti from 'react-dom-confetti';
import {RootState} from "../store";
import {connect, ConnectedProps} from "react-redux";
import {authentication, User} from "../services/authentication";
import {Round} from "../store/game/types";

export function userHasWon(user: User | null, previousRound: Round | null, currentRound: Round | null) {
  let hasWon = false;
  if (user !== null) {
    const userId = user.id;
    if (previousRound !== null && currentRound === null) {
      const winningAnswer = previousRound.answers.find((answer) => answer.isWinner);
      if (winningAnswer !== undefined) {
        hasWon = previousRound.answers
          .some((answer) => answer.votes.some((vote) => vote.id === userId))
      }
    }
  }
  return hasWon;
}

const mapState = (state: RootState) => {
  const user = authentication.getUser();
  const hasWon = userHasWon(user, state.game.previousRound, state.game.currentRound);
  return {hasWon: hasWon}
};

const connector = connect(mapState);

const Confetti: FunctionComponent<ConnectedProps<typeof connector>> = ({hasWon}) => {

  const config = {
    angle: 90,
    spread: 100,
    duration: 5000,
    dragFriction: 0.1,
    stagger: 0,
    startVelocity: 45,
    elementCount: 100,
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  return <div style={{position: 'absolute', left: '50%'}}>
    <ReactDomConfetti active={hasWon} config={config} />
  </div>

};

export default connector(Confetti);

