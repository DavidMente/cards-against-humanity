export const SET_GAME = 'SET_GAME';
export const START_GAME = 'START_GAME';
export const LOAD_GAME = 'LOAD_GAME';
export const VOTE = 'VOTE';
export const JOIN_GAME = 'JOIN_GAME';
export const CREATE_GAME = 'CREATE_GAME';

interface SetGame {
  type: typeof SET_GAME,
  payload: Game
}

export type GameActions = SetGame

export interface Game {
  id: string | null,
  status: string,
  players: Player[],
  currentRound: Round | null,
  previousRound: Round | null
}

export interface Round {
  number: number,
  question: string,
  answers: Answer[]
}

export interface Answer {
  text: string,
  votes: { id: string, name: string }[],
  isWinner: boolean
}

export interface Player {
  id: string,
  name: string,
  points: number,
  userId: string,
  status: string
}
