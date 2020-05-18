export const authentication = {

  storeSecret: (secret: string): void => {
    localStorage.setItem('secret', secret);
  },

  getSecret: (): string | null => {
    return localStorage.getItem('secret') || null
  }

};
