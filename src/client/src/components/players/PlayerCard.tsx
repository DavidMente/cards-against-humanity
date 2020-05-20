import React, {FunctionComponent, useEffect, useState} from "react";
import {Player} from "../../store/game/types";
import avatar1 from '../../avatars/1.jpg';
import avatar2 from '../../avatars/2.jpg';
import avatar3 from '../../avatars/3.jpg';
import avatar4 from '../../avatars/4.jpg';
import avatar5 from '../../avatars/5.jpg';
import avatar6 from '../../avatars/6.jpg';
import avatar7 from '../../avatars/7.jpg';
import avatar8 from '../../avatars/8.jpg';
import avatar9 from '../../avatars/9.jpg';
import avatar10 from '../../avatars/10.jpg';
import Confetti from "../Confetti";
import {authentication} from "../../services/authentication";
import './player-card.scss';

type PlayerCardProps = {
  player: Player,
}

const PlayerCard: FunctionComponent<PlayerCardProps> = ({player}) => {

  const user = authentication.getUser();
  const userIsPlayer = user !== null && player.userId === user.id;
  const [points, setPoints] = useState(-999);
  const [hasScored, setHasScored] = useState(false);

  useEffect(() => {
    if (player.points === points + 1 && userIsPlayer) {
      setHasScored(true);
      setTimeout(() => setHasScored(false), 1000);
    }
    setPoints(player.points);
  }, [player.points, points, userIsPlayer]);

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10];
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
            <div className={'has-text-grey'}>Score: {player.points}</div>{player.status === 'READY' ? <div className="tag is-success">Ready</div> : ''}
          </div>
        </div>
      </div>
    </div>
    <Confetti isActive={hasScored} />
  </div>;
};

export default PlayerCard
