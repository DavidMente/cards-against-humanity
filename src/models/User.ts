import {getRandomId} from "../utils/getRandomId";
import WebSocket from "ws";

class User {

  public id: string;
  public secret: string;
  public socket: WebSocket;

  constructor(ws: WebSocket) {
    this.id = getRandomId();
    this.secret = getRandomId();
    this.socket = ws;
  }

  public setSocket(ws: WebSocket) {
    this.socket = ws;
  }

}

export default User;
