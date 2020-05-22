import React, {FunctionComponent} from "react";
import {Player} from "../../store/game/types";
import {authentication} from "../../services/authentication";
import './player-card.scss';
import {avatars} from "../../avatars/avatars";

type PlayerCardProps = {
  player: Player,
}

const PlayerCard: FunctionComponent<PlayerCardProps> = ({player}) => {

  const user = authentication.getUser();
  const userIsPlayer = user !== null && player.userId === user.id;

  const randomNumber = player.id.charCodeAt(0);
  const randomAvatar = avatars[randomNumber % avatars.length];

  return <div className={'card player-card'}>
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-96x96">
            <img src={randomAvatar} alt={'Avatar'} />
          </figure>
        </div>
        <div className="media-content">
          <div className={"title is-5" + (userIsPlayer ? ' has-text-primary' : '')}>{player.name}</div>
          <div className={'subtitle is-6'}>
            <div className={'has-text-grey'}>Score: {player.points}</div>
            {player.status === 'READY' ? <div className="tag is-success">Ready</div> : ''}
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default PlayerCard
