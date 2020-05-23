class Drawing {
  public lines: Line[] = [];

  constructor() {
  }
}

export default Drawing

export interface Line {
  color: string,
  points: Point[]
}

export interface Point {
  x: number,
  y: number
}
