import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
} from '@giantmachines/redux-websocket';

export interface MessageState {
  data: string | object;
  origin: string;
  timestamp: Date;
  type: 'OUTGOING' | 'INCOMING';
}

export interface WebSocketState {
  connected: boolean;
  messages: MessageState[];
  url: string | null;
}

export const WEBSOCKET_PREFIX = "REDUX_WEBSOCKET";
export const REDUX_WEBSOCKET_OPEN = `${WEBSOCKET_PREFIX}::${WEBSOCKET_OPEN}`;
export const REDUX_WEBSOCKET_CLOSED = `${WEBSOCKET_PREFIX}::${WEBSOCKET_CLOSED}`;
export const REDUX_WEBSOCKET_MESSAGE = `${WEBSOCKET_PREFIX}::${WEBSOCKET_MESSAGE}`;
export const REDUX_WEBSOCKET_CONNECT = `${WEBSOCKET_PREFIX}::${WEBSOCKET_CONNECT}`;

interface ConnectWebSocket {
  type: typeof REDUX_WEBSOCKET_CONNECT,
  meta: {
    timestamp: Date
  },
  payload: {
    url: string
  },
}

interface OpenedWebSocket {
  type: typeof REDUX_WEBSOCKET_OPEN,
  meta: {
    timestamp: Date,
  },
  payload?: any
}

interface ClosedWebSocket {
  type: typeof REDUX_WEBSOCKET_CLOSED,
  meta: {
    timestamp: Date,
  },
  payload?: any
}

interface WebSocketMessage {
  type: typeof REDUX_WEBSOCKET_MESSAGE,
  meta: {
    timestamp: Date,
  },
  payload: {
    message: string,
    origin: string,
  },
}

export type WebSocketActionTypes = ConnectWebSocket | OpenedWebSocket | ClosedWebSocket | WebSocketMessage
