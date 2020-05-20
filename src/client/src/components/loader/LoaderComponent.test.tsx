import {render} from "@testing-library/react";
import LoaderComponent from "./LoaderComponent";
import React from 'react';

describe('LoaderComponent', () => {

  it('should render the text', () => {
    const {queryByText} = render(<LoaderComponent text={'loading'} />);
    expect(queryByText(/loading/i)).toBeTruthy();
  })

});
