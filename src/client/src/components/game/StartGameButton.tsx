import React, {FunctionComponent} from "react";
import {connect, ConnectedProps} from "react-redux";
import {send} from "@giantmachines/redux-websocket/dist";
import {START_GAME} from "../../store/game/types";

const mapDispatch = {
  startGame: (gameId: string) => send({action: START_GAME, payload: {gameId: gameId}})
};

const connector = connect(null, mapDispatch);

type StartGameButtonProps = {
  gameId: string
} & ConnectedProps<typeof connector>

const StartGameButton: FunctionComponent<StartGameButtonProps> = ({gameId, startGame}) => {

  function start() {
    if (window.confirm('All players ready?')) {
      startGame(gameId)
    }
  }

  return <div className={'columns is-centered is-vcentered'}>
    <div className={'link-info'}>link:</div>
    <input className={'input input-link'} value={window.location.href} readOnly
           onFocus={(event) => event.target.select()} />
    <button onClick={() => start()} className={'button is-primary'}>Start the game</button>
  </div>
};

export default connector(StartGameButton);
