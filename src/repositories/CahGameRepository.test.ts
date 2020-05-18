import CahGameRepository from "./CahGameRepository";
import CahGame from "../models/cah/CahGame";

describe('CahGameRepository', () => {

  const repository = new CahGameRepository();

  it('should be empty', () => {
    expect(repository.getGames()).toEqual([]);
  });

  it('should add a game', () => {
    repository.addGame(new CahGame('123'))
    expect(repository.getGames()[0].id).toEqual('123');
  })

});
