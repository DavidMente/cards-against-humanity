export const gameRepository = {

  storeSecret: (gameId: string, secret: string): void => {
    localStorage.setItem(gameId, secret);
  },

  getSecret: (gameId: string): string | null => {
    return localStorage.getItem(gameId) || null
  }

};
