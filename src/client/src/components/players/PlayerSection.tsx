import React, {FunctionComponent} from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PlayerCard from "./PlayerCard";
import {Player} from "../../store/game/types";

type PlayerSectionProps = {
  players: Player[]
}

const PlayerSection: FunctionComponent<PlayerSectionProps> = ({players}) =>
  <ReactCSSTransitionGroup
    transitionName="slide-fade"
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}
    className={'columns is-centered is-multiline'}
  >
    {players.map((player) =>
      <div className={'column is-narrow'} key={`${player.id}_container`}>
        <PlayerCard player={player} key={player.id} />
      </div>
    )}
  </ReactCSSTransitionGroup>;

export default PlayerSection;
