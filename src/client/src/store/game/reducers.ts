import {Game, GameActions, SET_GAME} from "./types";

const initialState: Game = {
  id: null,
  status: 'WAITING_FOR_PLAYERS',
  players: [],
  currentRound: null,
  previousRound: null
};

export function gameReducer(state = initialState, action: GameActions): Game {
  switch (action.type) {
    case SET_GAME:
      return {...state, ...action.payload};
    default:
      return state
  }
}
