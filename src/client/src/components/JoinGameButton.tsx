import React, {FunctionComponent, useState} from "react";
import {send} from "@giantmachines/redux-websocket/dist";
import {connect, ConnectedProps} from "react-redux";

const mapDispatch = {
  joinGame: (gameId: string, playerName: string) => send({
    action: 'JOIN_GAME',
    payload: {gameId: gameId, playerName: playerName}
  })
};

const connector = connect(null, mapDispatch);

type JoinGameButtonProps = {
  gameId: string
} & ConnectedProps<typeof connector>

const JoinGameButton: FunctionComponent<JoinGameButtonProps> = ({gameId, joinGame}) => {

  const [playerName, setPlayerName] = useState('');

  function handleKey(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      joinGame(gameId, playerName)
    }
  }

  return <div className={'columns is-centered'}>
    <div className={'box button-box'}>
      <input type={'text'} onChange={(event) => setPlayerName(event.target.value)}
             value={playerName} className={'input'} onKeyDown={handleKey}
             placeholder={'Enter your name'} />
      <button onClick={() => joinGame(gameId, playerName)} className={'button is-primary'}
              disabled={playerName === ''}>Join game
      </button>
    </div>
  </div>
};

export default connector(JoinGameButton);
