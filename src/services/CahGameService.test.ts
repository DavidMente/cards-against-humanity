import CahGameService from "./CahGameService";
import CahGame from "../models/cah/CahGame";

describe('CahGameService', () => {

  const gameService = new CahGameService();

  it('should create a new round', () => {
    const game = new CahGame('1');
    gameService.createNewRound(game);
    const round = game.currentRound!;
    expect(round.question).not.toBeNull();
    expect(round.answers.length).toEqual(CahGameService.ANSWER_COUNT);
    expect(round.number).toEqual(1);
  });

  it('should process the current round', () => {
    const game = new CahGame('2');
    gameService.createNewRound(game);
    gameService.processCurrentRound(game);
    expect(game.currentRound).toBeNull();
    expect(game.previousRound).not.toBeNull();
  })

});
