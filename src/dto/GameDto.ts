import {GameStatus} from "../models/Game";
import {PlayerDto} from "./PlayerDto";

export interface GameDto {
  id: string;
  status: GameStatus;
  players: PlayerDto[];
}
