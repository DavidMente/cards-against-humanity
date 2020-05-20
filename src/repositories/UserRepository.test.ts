import UserRepository from "./UserRepository";
import WebSocket from "ws";

describe('UserRepository', () => {

  const ws = new WebSocket('ws://localhost:5000');
  const userRepositoryFactory = () => new UserRepository();

  afterAll(() => ws.close());

  it('should create a new user', () => {
    const userRepository = userRepositoryFactory();

    userRepository.findOrCreateUser(ws);

    expect(userRepository.getUsers().length).toEqual(1);
  });

  it('should not create a new user', () => {
    const userRepository = userRepositoryFactory();
    const user = userRepository.findOrCreateUser(ws);

    userRepository.findOrCreateUser(ws, user.secret);

    expect(userRepository.getUsers().length).toEqual(1);
  })

});
