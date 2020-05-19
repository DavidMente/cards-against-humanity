import {logger} from "../logger";

export default function parseMessage(message: string): WebSocketRequest | null {
  try {
    const parsed = JSON.parse(message);
    if (isWebSocketRequest(parsed)) {
      return parsed;
    } else {
      logger.error(`Invalid message format: ${message}`);
      return null;
    }
  } catch (e) {
    logger.error(`Invalid message format: ${message}`);
    return null;
  }
}
export const CREATE_GAME = 'CREATE_GAME';
export const START_GAME = 'START_GAME';
export const JOIN_GAME = 'JOIN_GAME';
export const LOAD_GAME = 'LOAD_GAME';
export const VOTE = 'VOTE';

export interface CreateGame {
  action: typeof CREATE_GAME;
  payload: { playerName: string };
}

export interface JoinGame {
  action: typeof JOIN_GAME;
  payload: { gameId: string; playerName: string };
}

export interface LoadGame {
  action: typeof LOAD_GAME;
  payload: { gameId: string };
}

export interface Vote {
  action: typeof VOTE;
  payload: { gameId: string, answer: number };
}

export interface StartGame {
  action: typeof START_GAME;
  payload: { gameId: string };
}

export type WebSocketRequest = CreateGame | JoinGame | LoadGame | Vote | StartGame

function isWebSocketRequest(object: any): object is WebSocketRequest {
  return 'action' in object && 'payload' in object;
}
