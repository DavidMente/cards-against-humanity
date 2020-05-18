import React, {FunctionComponent} from "react";
import {send} from "@giantmachines/redux-websocket/dist";
import {connect, ConnectedProps} from "react-redux";
import PlayerForm from "./PlayerForm";

const mapDispatch = {
  joinGame: (gameId: string, playerName: string) => send({
    action: 'JOIN_GAME',
    payload: {gameId: gameId, playerName: playerName}
  })
};

const connector = connect(null, mapDispatch);

type JoinGameFormProps = {
  gameId: string
} & ConnectedProps<typeof connector>

const JoinGameForm: FunctionComponent<JoinGameFormProps> = ({joinGame, gameId}) => {
  const action = (playerName: string) => joinGame(gameId, playerName);
  return <PlayerForm buttonText={'Join game'} action={action} />
};

export default connector(JoinGameForm);
