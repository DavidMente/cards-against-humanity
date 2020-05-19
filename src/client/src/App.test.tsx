import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App', () => {

  it('should render the app layout', () => {
    const {getByText} = render(<App />);
    const headerElement = getByText(/David's Cards Against Humanity App/i);
    expect(headerElement).toBeInTheDocument();
  });

});
