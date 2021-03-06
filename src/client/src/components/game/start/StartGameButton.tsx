import React, {FunctionComponent} from "react";
import {connect, ConnectedProps} from "react-redux";
import {send} from "@giantmachines/redux-websocket/dist";
import {START_GAME} from "../../../store/game/types";
import MiniFormLayout from "../../layout/MiniFormLayout";
import WhatsAppLink from "../../WhatsAppLink";

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

  const link = window.location.href;

  return <MiniFormLayout>
    <div style={{marginBottom: '5px'}}>Send this link to your friends:</div>
    <input className={'input has-background-light has-text-grey link-input'} value={link} readOnly
           onFocus={(event) => event.target.select()} />
    <WhatsAppLink text={link} />
    <button onClick={() => start()} className={'button is-primary'}>Start the game</button>
  </MiniFormLayout>
};

export default connector(StartGameButton);
