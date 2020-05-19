import {render} from '@testing-library/react';
import StartGameButton from "./StartGameButton";
import React from "react";
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import {START_GAME} from "../../store/game/types";

describe('StartGameButton', () => {

  const mockStore = configureStore()({});
  window.confirm = jest.fn(() => true);

  it('should render the link correctly', () => {
    const {queryByDisplayValue} = render(<Provider store={mockStore}><StartGameButton gameId={'123'} /></Provider>);
    expect(queryByDisplayValue(window.location.href)).toBeTruthy();
  });

  it('should dispatch startGame', () => {
    const {getByText} = render(<Provider store={mockStore}><StartGameButton gameId={'123'} /></Provider>);
    getByText(/start the game/i).click();
    expect(mockStore.getActions()[0].payload.action).toEqual(START_GAME)
  });

});
