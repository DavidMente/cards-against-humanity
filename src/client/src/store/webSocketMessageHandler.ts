import {Middleware} from "redux";
import {REDUX_WEBSOCKET_CLOSED, REDUX_WEBSOCKET_MESSAGE} from "./websocket/types";
import {setGame} from "./game/actions";
import {connectWebSocket, history} from './'
import {authentication} from "../services/authentication";

export const GAME_LOADED = 'GAME_LOADED';
export const GAME_CREATED = 'GAME_CREATED';
export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_FOUND = 'NOT_FOUND';

export const webSocketMessageHandler: Middleware = (api) => (next) => (action) => {
  if (action.type === REDUX_WEBSOCKET_MESSAGE) {
    const message = JSON.parse(action.payload.message);
    if (message.hasOwnProperty('action')) {
      switch (message.action) {
        case GAME_LOADED:
          return next(setGame(message.payload));
        case GAME_CREATED:
          return history.push(`/game/${message.payload.id}`);
        case AUTHENTICATED:
          return authentication.storeUser(message.payload.user);
        case NOT_FOUND:
          return history.push('/');
        default:
      }
    }
  } else if (action.type === REDUX_WEBSOCKET_CLOSED) {
    setTimeout(connectWebSocket, 1000)
  }
  return next(action);
};
