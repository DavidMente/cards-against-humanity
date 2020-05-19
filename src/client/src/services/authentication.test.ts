import {authentication} from "./authentication";

describe('authentication', () => {

  it('should getand store the user', () => {
    expect(authentication.getUser()).toBeNull();
    const user = {id: "123", secret: '53'};
    authentication.storeUser(user);
    expect(authentication.getUser()).toEqual(user);
  })

});
