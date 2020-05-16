import React, {FunctionComponent} from "react";
import {Player} from "../store/game/types";
import avatar1 from '../avatars/1.jpg';
import avatar2 from '../avatars/2.jpg';
import avatar3 from '../avatars/3.jpg';
import avatar4 from '../avatars/4.jpg';
import avatar5 from '../avatars/5.jpg';
import avatar6 from '../avatars/6.jpg';
import avatar7 from '../avatars/7.jpg';
import avatar8 from '../avatars/8.jpg';
import avatar9 from '../avatars/9.jpg';
import avatar10 from '../avatars/10.jpg';

type PlayerCardProps = {
  player: Player,
}

const PlayerCard: FunctionComponent<PlayerCardProps> = ({player}) => {

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10];
  const randomNumber = player.id.charCodeAt(0);
  const randomAvatar = avatars[randomNumber % avatars.length];

  return <div className={'card'}>
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-96x96">
            <img src={randomAvatar} alt={'Avatar'} />
          </figure>
        </div>
        <div className="media-content">
          <p className={"title is-6" + (player.secret !== null ? ' has-text-primary' : '')}>{player.name}</p>
          <p>Score: {player.points}</p>
          <p>{player.status === 'READY' ? <span className="tag is-success">Ready</span> : ''}</p>
        </div>
      </div>
    </div>
  </div>;
};

export default PlayerCard
