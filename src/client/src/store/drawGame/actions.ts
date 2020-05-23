import {ADD_LINE, ADD_POINT, DrawGameActions, Point} from "./types";

export function addLine(color: string, point: Point): DrawGameActions {
  return {
    type: ADD_LINE,
    payload: {color: color, point: point}
  }
}

export function addPoint(point: Point): DrawGameActions {
  return {
    type: ADD_POINT,
    payload: point
  }
}
