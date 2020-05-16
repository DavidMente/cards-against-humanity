import React, {FunctionComponent, useEffect} from "react";
import {RootState} from "../store";
import {Game} from "../store/game/types";
import {setGame} from "../store/game/actions";
import webSocket, {sendMessage} from "../webSocket";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {connect, ConnectedProps} from "react-redux";
import PlayerCard from "./PlayerCard";
import {gameRepository} from "../gameRepository";
import JoinGameButton from "./JoinGameButton";
import StartGameButton from "./StartGameButton";
import RoundComponent from "./RoundComponent";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const mapState = (state: RootState) => {

  const player = state.game.players.find((player) => player.secret !== null);

  return {
    game: state.game,
    player: player,
    isPlayer: player !== undefined
  }
};

const mapDispatch = {
  setGame: (game: Game) => setGame(game)
};

const connector = connect(mapState, mapDispatch);

const GameSection: FunctionComponent<ConnectedProps<typeof connector> & RouteComponentProps<any>> =
  ({game, setGame, match, isPlayer, player}) => {

    useEffect(() => {
      webSocket.onmessage = (event) => setGame(JSON.parse(event.data));
    }, [setGame]);

    useEffect(() => {
      if (match.params.gameId !== null) {
        const secret = gameRepository.getSecret(match.params.gameId);
        sendMessage({action: 'LOAD_GAME', payload: {gameId: match.params.gameId, secret: secret}});
      }
    }, [match.params.gameId]);

    useEffect(() => {
      game.players.forEach((player) => {
        if (player.secret !== null) {
          gameRepository.storeSecret(game.id!, player.secret)
        }
      })
    }, [game]);

    return <div>
      <ReactCSSTransitionGroup
        transitionName="slide-fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        className={'columns is-centered'}
      >
        {game.players.map((player) =>
          <div className={'column is-one-quarter'} key={`${player.id}_container`}>
            <PlayerCard player={player} key={player.id} />
          </div>
        )}
      </ReactCSSTransitionGroup>
      {!isPlayer && game.status === 'WAITING_FOR_PLAYERS' ? <JoinGameButton gameId={match.params.gameId} /> : ''}
      {isPlayer && game.status === 'WAITING_FOR_PLAYERS' ? <StartGameButton /> : ''}
      <ReactCSSTransitionGroup
        transitionName="slide-fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {game.currentRound !== null ?
          <RoundComponent round={game.currentRound} gameId={match.params.gameId} player={player}
                          key={game.currentRound.number} isActive={true} /> : ''}
        {game.previousRound !== null ?
          <RoundComponent round={game.previousRound} gameId={match.params.gameId}
                          key={game.previousRound.number} isActive={false} /> : ''}
      </ReactCSSTransitionGroup>
    </div>
  };

export default connector(withRouter(GameSection));
