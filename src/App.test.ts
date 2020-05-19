jest.mock('ws');
import App from "./App";

describe('App', () => {

  const app = new App();
  app.listen();
  app.setupWebSocketServer();

  afterAll(() => {
    app.getHttpServer().close()
  });

  it('should start the server and listen', () => {
    expect(app.getHttpServer().listening).toBeTruthy();
  });

  it('should handle an upgrade request', () => {
    app.getHttpServer().emit('upgrade');
    expect(app.getWebSocketServer().handleUpgrade).toHaveBeenCalled();
  })

});
