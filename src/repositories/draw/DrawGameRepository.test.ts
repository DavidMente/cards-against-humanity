import DrawGameRepository from "./DrawGameRepository";

describe('DrawGameRepository', () => {

  const repository = new DrawGameRepository();

  it('should create a new game', () => {
    const game = repository.createGame();
    expect(repository.getGames()[0].id).toEqual(game.id);
  })
  
});
