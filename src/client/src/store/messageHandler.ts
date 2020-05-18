import {Middleware} from "redux";
import {REDUX_WEBSOCKET_MESSAGE} from "./websocket/types";
import {setGame} from "./game/actions";
import {history} from './'

export const messageHandler: Middleware = api => next => action => {
  if (action.type === REDUX_WEBSOCKET_MESSAGE) {
    const message = JSON.parse(action.payload.message);
    if (message.hasOwnProperty('action')) {
      switch (message.action) {
        case 'GAME_LOADED':
          return next(setGame(message.payload));
        case 'GAME_CREATED':
          return history.push(`/game/${message.payload.id}`);
        default:
      }
    }
  }
  return next(action);
};
