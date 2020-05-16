import React, {FunctionComponent, useState} from "react";
import {sendMessage} from "../webSocket";

type JoinGameButtonProps = {
  gameId: string
}

const JoinGameButton: FunctionComponent<JoinGameButtonProps> = ({gameId}) => {

  const [playerName, setPlayerName] = useState('');

  function joinGame(playerName: string) {
    sendMessage({action: 'JOIN_GAME', payload: {gameId: gameId, playerName: playerName}})
  }

  function handleKey(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      joinGame(playerName)
    }
  }

  return <div className={'columns is-centered'}>
    <div className={'box button-box'}>
      <input type={'text'} onChange={(event) => setPlayerName(event.target.value)}
             value={playerName} className={'input'} onKeyDown={handleKey}
             placeholder={'Enter your name'} />
      <button onClick={() => joinGame(playerName)} className={'button is-primary'} disabled={playerName === ''}>Join game</button>
    </div>
  </div>
};

export default JoinGameButton;
