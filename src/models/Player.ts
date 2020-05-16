import {getRandomId} from "../utils/getRandomId";
import * as WebSocket from 'ws';

export enum PlayerStatus {
  NOT_READY = 'NOT_READY',
  READY = 'READY'
}

class Player {

  public id: string;
  public name: string;
  public socket: WebSocket;
  public secret: string;
  public points: number = 0;
  public status: PlayerStatus = PlayerStatus.NOT_READY;

  constructor(ws: WebSocket, name: string) {
    this.id = getRandomId();
    this.socket = ws;
    this.name = name;
    this.secret = getRandomId();
  }

}

export default Player
