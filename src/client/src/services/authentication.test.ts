import {authentication} from "./authentication";

describe('authentication', () => {

  it('should getand store the secret', () => {
    expect(authentication.getSecret()).toBeNull();
    authentication.storeSecret('secret');
    expect(authentication.getSecret()).toEqual('secret');
  })

});
