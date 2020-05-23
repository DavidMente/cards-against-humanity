import {ADD_LINE, ADD_POINT, DrawGame, DrawGameActions} from "./types";

const initialState: DrawGame = {
  lines: []
};

export function drawGameReducer(state = initialState, action: DrawGameActions) {
  switch (action.type) {
    case ADD_LINE:
      return {lines: [...state.lines, {color: action.payload.color, points: [action.payload.point]}]};
    case ADD_POINT:
      const lastLineIndex = state.lines.length - 1;
      const lines = [...state.lines];
      lines[lastLineIndex] = {...lines[lastLineIndex], points: [...lines[lastLineIndex].points, action.payload]};
      return {lines: lines};
    default:
      return state;
  }
}
