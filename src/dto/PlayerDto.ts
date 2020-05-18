import {PlayerStatus} from "../models/Player";

export interface PlayerDto {
  id: string;
  name: string;
  status: PlayerStatus;
}
