import React, {FunctionComponent} from "react";
import {RootState} from "../store";
import {connect, ConnectedProps} from "react-redux";
import {send} from "@giantmachines/redux-websocket/dist";

const mapState = (state: RootState) => {
  return {
    gameId: state.game.id,
  }
};

const mapDispatch = {
  startGame: (gameId: string) => send({action: 'START_GAME', payload: {gameId: gameId}})
};

const connector = connect(mapState, mapDispatch);

const StartGameButton: FunctionComponent<ConnectedProps<typeof connector>> = ({gameId, startGame}) => {

  function start() {
    if (gameId !== null && window.confirm('All players ready?')) {
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
