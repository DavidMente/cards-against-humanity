export default function parseMessage(message: string): WebSocketRequest {
  try {
    return JSON.parse(message) as WebSocketRequest;
  } catch (e) {
    throw new TypeError(`Invalid message format: ${message}`)
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
  payload: { gameId: string, secret: string | null };
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
