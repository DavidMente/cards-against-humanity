import {applyMiddleware, createStore, combineReducers} from 'redux';
import {gameReducer} from "./game/reducers";
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import reduxWebsocket from '@giantmachines/redux-websocket';
import {connect} from "@giantmachines/redux-websocket/dist";
import {webSocketReducer} from "./websocket/reducers";
import {WEBSOCKET_PREFIX} from "./websocket/types";
import {messageHandler} from "./messageHandler";
import {authentication} from "../authentication";

export const history = createBrowserHistory();
const reduxWebsocketMiddleware = reduxWebsocket({
  prefix: WEBSOCKET_PREFIX,
  reconnectOnClose: true,
  reconnectInterval: 1000
});

const rootReducer = combineReducers({
  game: gameReducer,
  router: connectRouter(history),
  webSocket: webSocketReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,
  applyMiddleware(routerMiddleware(history), reduxWebsocketMiddleware, messageHandler));

let url: string;

if (process.env.NODE_ENV === 'production') {
  url = 'wss://davids-cah-app.herokuapp.com';
} else {
  url = 'ws://localhost:5000'
}

const secret = authentication.getSecret();
const args = secret !== null ? [secret] : [];
store.dispatch(connect(url, args));
