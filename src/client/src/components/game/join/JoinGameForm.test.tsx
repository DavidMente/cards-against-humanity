import {render, fireEvent} from '@testing-library/react';
import React from "react";
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import JoinGameForm from "./JoinGameForm";
import {JOIN_GAME} from "../../../store/game/types";

describe('JoinGameForm', () => {

  const mockStore = configureStore()({});

  it('should dispatch joinGame', () => {
    const {getByText, getByPlaceholderText} = render(<Provider store={mockStore}><JoinGameForm gameId={'123'} /></Provider>);
    const input = getByPlaceholderText(/enter your name/i);
    fireEvent.change(input, {target: {value: 'john'}});
    const button = getByText(/join game/i);
    button.click();
    expect(mockStore.getActions()[0].payload.action).toEqual(JOIN_GAME)
  });

});
