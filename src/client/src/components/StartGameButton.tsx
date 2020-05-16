import React, {FunctionComponent} from "react";
import {RootState} from "../store";
import {connect, ConnectedProps} from "react-redux";
import {sendMessage} from "../webSocket";

const mapState = (state: RootState) => {
  return {
    gameId: state.game.id,
  }
};

const connector = connect(mapState);

const StartGameButton: FunctionComponent<ConnectedProps<typeof connector>> = ({gameId}) => {

  function start() {
    if (window.confirm('All players ready?')) {
      sendMessage({action: 'START_GAME', payload: {gameId: gameId}})
    }
  }

  return <div className={'columns is-centered is-vcentered'}>
    <div className={'link-info'}>link:</div>
    <input className={'input input-link'} value={window.location.href}
           onFocus={(event) => event.target.select()} />
    <button onClick={() => start()} className={'button is-primary'}>Start the game</button>
  </div>
};

export default connector(StartGameButton);
