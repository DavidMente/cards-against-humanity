import User from "../models/User";
import WebSocket from "ws";

class UserRepository {

  private users: User[] = [];

  public findOrCreateUser(ws: WebSocket, secret: string | undefined = undefined): User {
    let user: User | undefined;
    if (secret !== undefined) {
      user = this.getUserBySecret(secret)
    }
    if (user === undefined) {
      user = new User(ws);
      this.users = [...this.users, user];
    } else {
      user.setSocket(ws);
    }
    return user;
  }

  public getUserBySecret(secret: string): User | undefined {
    return this.users.find((user) => user.secret === secret);
  }

  public getUserByWebSocket(ws: WebSocket): User {
    return this.users.find((user) => user.socket === ws)!; // cannot be undefined
  }

  public getUserById(userId: string): User | undefined {
    return this.users.find((user) => user.id === userId);
  }

}

export default UserRepository;

export const userRepository = new UserRepository();
