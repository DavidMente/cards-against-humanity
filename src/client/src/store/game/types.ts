export const SET_GAME = 'SET_GAME';

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
  votes: { id: string, name: string }[]
}

export interface Player {
  id: string,
  name: string,
  points: number,
  secret: string | null,
  status: string
}
