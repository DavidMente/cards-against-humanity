import React, {FunctionComponent} from "react";
import {Player, Round} from "../store/game/types";
import QuestionComponent from "./QuestionComponent";
import AnswerComponent from "./AnswerComponent";

type RoundComponentProps = {
  round: Round,
  gameId: string,
  isCurrentRound: boolean,
  player?: Player
}

const RoundComponent: FunctionComponent<RoundComponentProps> = ({round, gameId, player, isCurrentRound}) => {

  let max: number = 0;
  let winningIndex: number | null = null;
  const voteCounts = round.answers.map((answer) => answer.votes.length);
  voteCounts.forEach((count, index) => {
    if (count > max) {
      max = count;
      winningIndex = index;
    } else if (count === max) {
      winningIndex = null;
    }
  });

  return <div className={isCurrentRound ? 'box has-background-white-bis current-round' : 'previous-round'}>
    {isCurrentRound ? <div className="subtitle is-6">
      Round {round.number} - Choose the best answer!
    </div> : <div className={'subtitle is-6'}>Previous round:</div>}
    <QuestionComponent question={round.question} />
    <div className={'columns is-vcentered'}>
      {round.answers.map((answer, index) =>
        <div className={'column'}>
          <AnswerComponent index={index} answer={answer} key={index} isWinningAnswer={index === winningIndex}
                           canPick={player !== undefined && player.status === 'NOT_READY'} gameId={gameId} />
        </div>
      )}
    </div>
  </div>;
};
export default RoundComponent
