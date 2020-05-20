import React from 'react';
import {render} from '@testing-library/react';
import QuestionComponent from "./QuestionComponent";

describe('QuestionComponent', () => {
  it('should render the text correctly', () => {
    const {queryByText} = render(<QuestionComponent question={'Hello World'} />);
    expect(queryByText(/hello world/i)).toBeTruthy();
  })
});
