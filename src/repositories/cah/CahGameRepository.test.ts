import CahGameRepository from "./CahGameRepository";

describe('CahGameRepository', () => {

  const repository = new CahGameRepository();

  it('should be empty', () => {
    expect(repository.getGames()).toEqual([]);
  });

  it('should create a game', () => {
    const game = repository.createGame();
    expect(repository.getGames()[0].id).toEqual(game.id);
  })

});
