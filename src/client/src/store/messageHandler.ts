import {Middleware} from "redux";
import {REDUX_WEBSOCKET_MESSAGE} from "./websocket/types";
import {setGame} from "./game/actions";

export const messageHandler: Middleware = api => next => action => {
  if (action.type === REDUX_WEBSOCKET_MESSAGE) {
    next(setGame(JSON.parse(action.payload.message)));
  }
  return next(action);
};
