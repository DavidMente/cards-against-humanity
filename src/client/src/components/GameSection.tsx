import React, {FunctionComponent, useEffect} from "react";
import {RootState} from "../store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {connect, ConnectedProps} from "react-redux";
import StartGameButton from "./game/start/StartGameButton";
import RoundComponent from "./cah/round/RoundComponent";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {send} from "@giantmachines/redux-websocket/dist";
import JoinGameForm from "./game/join/JoinGameForm";
import {LOAD_GAME} from "../store/game/types";
import {authentication} from "../services/authentication";
import PlayerSection from "./players/PlayerSection";
import Confetti from "./Confetti";

const mapState = (state: RootState) => {

  const user = authentication.getUser();
  const player = user !== null
    ? state.game.players.find((player) => player.userId === user.id)
    : undefined;

  return {
    game: state.game,
    player: player,
    isPlayer: player !== undefined,
    webSocketConnected: state.webSocket.connected
  }
};

const mapDispatch = {
  loadGame: (gameId: string) => send({
    action: LOAD_GAME,
    payload: {gameId: gameId}
  }),
};

const connector = connect(mapState, mapDispatch);

const GameSection: FunctionComponent<ConnectedProps<typeof connector> & RouteComponentProps<any>> =
  ({game, match, isPlayer, player, loadGame, webSocketConnected}) => {

    useEffect(() => {
      if (match.params.gameId !== null && webSocketConnected) {
        loadGame(match.params.gameId);
      }
    }, [match.params.gameId, loadGame, webSocketConnected]);

    return <div>
      <PlayerSection players={game.players}/>
      {!isPlayer && game.status === 'WAITING_FOR_PLAYERS' ? <JoinGameForm gameId={match.params.gameId} /> : ''}
      {isPlayer && game.status === 'WAITING_FOR_PLAYERS' ? <StartGameButton gameId={match.params.gameId} /> : ''}
      <Confetti />
      <ReactCSSTransitionGroup
        transitionName="slide-fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {game.currentRound !== null ?
          <RoundComponent round={game.currentRound} gameId={match.params.gameId} player={player}
                          key={game.currentRound.number} isCurrentRound /> : ''}
        {game.previousRound !== null ?
          <RoundComponent round={game.previousRound} gameId={match.params.gameId}
                          key={game.previousRound.number} isCurrentRound={false} /> : ''}
      </ReactCSSTransitionGroup>
    </div>
  };

export default connector(withRouter(GameSection));
