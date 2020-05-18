import {getRandomId} from "../utils/getRandomId";

export enum PlayerStatus {
  NOT_READY = 'NOT_READY',
  READY = 'READY'
}

class Player {

  public id: string;
  public userId: string;
  public name: string;
  public points: number = 0;
  public status: PlayerStatus = PlayerStatus.NOT_READY;

  constructor(userId: string, name: string) {
    this.id = getRandomId();
    this.userId = userId;
    this.name = name;
  }

}

export default Player
