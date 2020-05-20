import React, {FunctionComponent} from "react";
import {connect, ConnectedProps} from "react-redux";
import {send} from "@giantmachines/redux-websocket/dist";
import PlayerForm from "../PlayerForm";
import {CREATE_GAME} from "../../../store/game/types";

const mapDispatch = {
  createGame: (playerName: string) => send({action: CREATE_GAME, payload: {playerName: playerName}})
};

const connector = connect(null, mapDispatch);

const CreateGameForm: FunctionComponent<ConnectedProps<typeof connector>> = ({createGame}) =>
  <div>
    <PlayerForm buttonText={'Create game'} action={createGame} />
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
  </div>;

export default connector(CreateGameForm);
