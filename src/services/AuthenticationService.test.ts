import AuthenticationService from "./AuthenticationService";
import WebSocket from "ws";

describe('AuthenticationService', () => {

  const ws = new WebSocket('ws://localhost:5000');
  const authenticationService = new AuthenticationService();

  afterAll(() => ws.close());

  it('should authenticate the user', () => {
    const user = authenticationService.authenticate(undefined, ws);
    expect(user.secret).toBeDefined();
  })

});
