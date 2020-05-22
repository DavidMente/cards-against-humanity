export type User = {
  id: string,
  secret: string
}

export const authentication = {

  storeUser: (user: User): void => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: (): User | null => {
    return JSON.parse(localStorage.getItem('user') || 'null')
  }

};
