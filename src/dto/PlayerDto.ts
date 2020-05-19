import {PlayerStatus} from "../models/Player";

export interface PlayerDto {
  id: string;
  userId: string;
  name: string;
  status: PlayerStatus;
}
