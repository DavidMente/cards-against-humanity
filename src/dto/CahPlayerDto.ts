import {PlayerDto} from "./PlayerDto";
import Player, {PlayerStatus} from "../models/Player";

class CahPlayerDto implements PlayerDto {
  id: string;
  userId: string;
  name: string;
  points: number;
  status: PlayerStatus;

  constructor(player: Player) {
    this.id = player.id;
    this.name = player.name;
    this.points = player.points;
    this.status = player.status;
    this.userId = player.userId;
  }

}

export default CahPlayerDto
