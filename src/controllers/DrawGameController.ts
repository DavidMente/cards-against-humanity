import GameController from "./GameController";
import DrawGame from "../models/draw/DrawGame";
import {drawGameRepository} from "../repositories/draw/DrawGameRepository";
import DrawGameService from "../services/DrawGameService";
import DrawGameDto from "../dto/draw/DrawGameDto";

class DrawGameController extends GameController<DrawGame> {
  protected gameRepository = drawGameRepository;
  protected gameService: DrawGameService = new DrawGameService();

  gameToDto(game: DrawGame, userId: string): DrawGameDto {
    return new DrawGameDto(game, userId);
  }

}

export default DrawGameController
