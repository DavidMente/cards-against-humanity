import App from "./App";

describe('App', () => {

  const app = new App();

  afterAll(() => app.getHttpServer().close());

  it('should start the server and listen', () => {
    app.listen();
    app.setupWebSocketServer();
    expect(app.getHttpServer().listening).toBeTruthy();
  })

});
