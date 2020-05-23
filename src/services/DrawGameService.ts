import GameService from "./GameService";
import DrawGame from "../models/draw/DrawGame";
import DrawGameRepository, {drawGameRepository} from "../repositories/draw/DrawGameRepository";

class DrawGameService extends GameService<DrawGame> {
  protected gameRepository: DrawGameRepository = drawGameRepository;

}

export default DrawGameService
