import {Game, GameActions, SET_GAME} from "./types";

export function setGame(game: Game): GameActions {
  return {
    type: SET_GAME,
    payload: game
  }
}
