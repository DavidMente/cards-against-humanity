import {applyMiddleware, createStore, combineReducers} from 'redux';
import {gameReducer} from "./game/reducers";
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware} from 'connected-react-router';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  game: gameReducer,
  router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(routerMiddleware(history)));
