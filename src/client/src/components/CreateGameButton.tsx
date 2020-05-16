import React, {FunctionComponent, useEffect, useState} from "react";
import {RootState, store} from "../store";
import {connect, ConnectedProps} from "react-redux";
import webSocket, {sendMessage} from "../webSocket";
import {push} from "connected-react-router";

const mapState = (state: RootState) => {
  return {
    gameId: state.game.id
  }
};

const connector = connect(mapState);

const CreateGameButton: FunctionComponent<ConnectedProps<typeof connector>> = ({gameId}) => {

  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id !== null) {
        store.dispatch(push(`/game/${data.id}`));
      }
    };
  }, [gameId]);

  function createGame(playerName: string) {
    sendMessage({action: 'CREATE_GAME', payload: {playerName: playerName}})
  }

  function handleKey(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      createGame(playerName)
    }
  }

  return <div>
    <div className={'columns is-centered'}>
      <div className={'box button-box'}>
        <input type={'text'} onChange={(event) => setPlayerName(event.target.value)}
               value={playerName} className={'input'} onKeyDown={handleKey}
               placeholder={'Enter your name'} />
        <button disabled={playerName === ''} onClick={() => createGame(playerName)}
                className={'button is-primary'}>Create new game
        </button>
      </div>
    </div>
    <div className={'columns is-centered'}>
      <div className="notification is-half column tutorial">
        <p>
          This game is inspired by Cards against Humanity.
          The objective is to pick the answer which will get the most votes.
        </p>
        <br />
        <p>
          Each player who has picked the most voted answer will get a point. Ties don't count.
          Recommended for 3 or more players.
        </p>
        <br />
        <p>
          Create a new game and send the link to your friends. Enjoy!
        </p>
      </div>
    </div>
  </div>
};

export default connector(CreateGameButton);
