import CahGame from "../models/cah/CahGame";
import CahGameService from "../services/CahGameService";
import CahGameDto from "./CahGameDto";

describe('CahGameDto', () => {

  it('should hide votes from other players in currentRound', () => {
    const gameService = new CahGameService();
    const game = new CahGame("777");
    gameService.createNewRound(game);
    game.currentRound!.answers[0].votes = [{id: '1', name: 'a'}, {id: '2', name: 'b'}];
    game.currentRound!.answers[1].votes = [{id: '3', name: 'c'}];

    const gameDto = new CahGameDto(game, '1');

    expect(gameDto.currentRound!.answers[0].votes).toEqual([{id: '1', name: 'a'}]);
    expect(gameDto.currentRound!.answers[1].votes).toEqual([]);
    expect(gameDto.currentRound!.answers[2].votes).toEqual([]);
    expect(gameDto.currentRound!.answers[3].votes).toEqual([]);
  })

});
