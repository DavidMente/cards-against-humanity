import Exception from "./Exception";

export const NOT_FOUND = 'NOT_FOUND';

class NotFoundException implements Exception {
  public type: string = NOT_FOUND;

  constructor(public message?: string) {
  }
}

export default NotFoundException
