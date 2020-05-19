import {authentication} from "../services/authentication";
import {buildStore, rootReducer, storeEnhancer} from './';
import {REDUX_WEBSOCKET_MESSAGE} from "./websocket/types";
import {AUTHENTICATED, GAME_LOADED, webSocketMessageHandler} from "./webSocketMessageHandler";
import {Store} from "redux";

describe('webSocketMessageHandler', () => {

  let reduxStore: Store;

  beforeEach(() => reduxStore = buildStore(rootReducer, storeEnhancer));

  it('should load a game', () => {
    expect(reduxStore.getState().game.id).toBeNull();
    const message = {action: GAME_LOADED, payload: {id: '123'}};
    reduxStore.dispatch({type: REDUX_WEBSOCKET_MESSAGE, meta: {}, payload: {message: JSON.stringify(message)}});
    expect(reduxStore.getState().game.id).toEqual(message.payload.id);
  });

  it('should process the successful authentication', () => {
    expect(reduxStore.getState().game.id).toBeNull();
    const SECRET = '9673';
    const message = {action: AUTHENTICATED, payload: {user: {id: '123', secret: SECRET}}};
    reduxStore.dispatch({type: REDUX_WEBSOCKET_MESSAGE, meta: {}, payload: {message: JSON.stringify(message)}});
    expect(authentication.getUser()!.secret).toEqual(SECRET);
  })

});
