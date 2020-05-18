import React, {FunctionComponent, useEffect} from "react";
import {RootState} from "../store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {connect, ConnectedProps} from "react-redux";
import PlayerCard from "./PlayerCard";
import {gameRepository} from "../gameRepository";
import StartGameButton from "./StartGameButton";
import RoundComponent from "./RoundComponent";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {send} from "@giantmachines/redux-websocket/dist";
import JoinGameForm from "./JoinGameForm";

const mapState = (state: RootState) => {

  const player = state.game.players.find((player) => player.secret !== null);

  return {
    game: state.game,
    player: player,
    isPlayer: player !== undefined,
    webSocketConnected: state.webSocket.connected
  }
};

const mapDispatch = {
  loadGame: (gameId: string, secret: string | null) => send({
    action: 'LOAD_GAME',
    payload: {gameId: gameId, secret: secret}
  }),
};

const connector = connect(mapState, mapDispatch);

const GameSection: FunctionComponent<ConnectedProps<typeof connector> & RouteComponentProps<any>> =
  ({game, match, isPlayer, player, loadGame, webSocketConnected}) => {

    useEffect(() => {
      if (match.params.gameId !== null && webSocketConnected) {
        const secret = gameRepository.getSecret(match.params.gameId);
        loadGame(match.params.gameId, secret);
      }
    }, [match.params.gameId, loadGame, webSocketConnected]);

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
      {!isPlayer && game.status === 'WAITING_FOR_PLAYERS' ? <JoinGameForm gameId={match.params.gameId} /> : ''}
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
