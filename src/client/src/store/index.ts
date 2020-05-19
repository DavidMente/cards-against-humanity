import {applyMiddleware, createStore, combineReducers, Store, Reducer, StoreEnhancer} from 'redux';
import {gameReducer} from "./game/reducers";
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import reduxWebsocket from '@giantmachines/redux-websocket';
import {connect} from "@giantmachines/redux-websocket/dist";
import {webSocketReducer} from "./websocket/reducers";
import {WEBSOCKET_PREFIX} from "./websocket/types";
import {webSocketMessageHandler} from "./webSocketMessageHandler";
import {authentication} from "../services/authentication";
import {reactConfig} from "../reactConfig";

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  game: gameReducer,
  router: connectRouter(history),
  webSocket: webSocketReducer,
});

export type RootState = ReturnType<typeof rootReducer>

const reduxWebsocketMiddleware = reduxWebsocket({
  prefix: WEBSOCKET_PREFIX,
  reconnectOnClose: true,
  reconnectInterval: 1000
});

export const storeEnhancer = applyMiddleware(routerMiddleware(history), reduxWebsocketMiddleware, webSocketMessageHandler);

export function buildStore(reducer: Reducer, storeEnhancer: StoreEnhancer): Store {
  return createStore(reducer, storeEnhancer);
}

export const store = buildStore(rootReducer, storeEnhancer);

const webSocketUrl = reactConfig.WEBSOCKET;
const secret = authentication.getSecret();
const args = secret !== null ? [secret] : [];
store.dispatch(connect(webSocketUrl, args));
