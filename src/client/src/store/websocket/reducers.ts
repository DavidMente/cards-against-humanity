import {
  REDUX_WEBSOCKET_CLOSED,
  REDUX_WEBSOCKET_CONNECT, REDUX_WEBSOCKET_MESSAGE,
  REDUX_WEBSOCKET_OPEN,
  WebSocketActionTypes,
  WebSocketState
} from "./types";

const initialState: WebSocketState = {
  connected: false,
  messages: [],
  url: null,
};

export function webSocketReducer(state = initialState, action: WebSocketActionTypes): WebSocketState {
  switch (action.type) {
    case REDUX_WEBSOCKET_OPEN:
      return {
        ...state,
        connected: true
      };
    case REDUX_WEBSOCKET_CLOSED:
      return {
        ...state,
        connected: false,
      };
    case REDUX_WEBSOCKET_CONNECT:
      return {
        ...state,
        url: action.payload.url
      };
    case REDUX_WEBSOCKET_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            data: JSON.parse(action.payload.message),
            origin: action.payload.origin,
            timestamp: action.meta.timestamp,
            type: 'INCOMING',
          },
        ],
      };
    default:
      return state;
  }
}
