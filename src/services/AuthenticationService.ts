import WebSocket from "ws";
import User from "../models/User";
import UserRepository, {userRepository} from "../repositories/UserRepository";

class AuthenticationService {

  private userRepository: UserRepository = userRepository;

  public authenticate(secret: string | undefined, ws: WebSocket): User {
    return this.userRepository.findOrCreateUser(ws, secret);
  }

}

export default AuthenticationService;
