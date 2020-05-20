import React from 'react';
import {render} from '@testing-library/react';
import createMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import ConnectionIndicator from "./ConnectionIndicator";


describe('ConnectionIndicator', () => {

  const storeFactory = (state: object) => createMockStore()(state);

  it('should not display the indicator', () => {
    const store = storeFactory({webSocket: {connected: true}});
    const {queryByText} = render(<Provider store={store}>
      <ConnectionIndicator />
    </Provider>);
    expect(queryByText(/connecting/i)).toBeNull();
  });

  it('should display the indicator', () => {
    const store = storeFactory({webSocket: {connected: false}});
    const {queryByText} = render(<Provider store={store}>
      <ConnectionIndicator />
    </Provider>);
    expect(queryByText(/connecting/i)).toBeTruthy();
  })

});
