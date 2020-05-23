export type Point = {
  x: number,
  y: number
}

export type Line = {
  color: string,
  points: Point[]
}

export type DrawGame = {
  lines: Line[]
}

export const ADD_LINE = 'ADD_LINE';
export const ADD_POINT = 'ADD_POINT';

interface AddLine {
  type: typeof ADD_LINE,
  payload: {color: string, point: Point}
}

interface AddPoint {
  type: typeof ADD_POINT,
  payload: Point
}

export type DrawGameActions = AddLine | AddPoint
