import parseMessage from "./webSocketParser";

describe('webSocketParser', () => {

  it('should return null for invalid messages', () => {
    expect(parseMessage("Invalid")).toBeNull();
    expect(parseMessage(JSON.stringify({}))).toBeNull();
    expect(parseMessage(JSON.stringify({action: 'CREATE_GAME'}))).toBeNull();
  });

  it('should parse a valid action correctly', () => {
    const message = {action: 'CREATE_GAME', payload: {playerName: 'test'}};
    expect(parseMessage(JSON.stringify(message))).toEqual(message);
  })

});
