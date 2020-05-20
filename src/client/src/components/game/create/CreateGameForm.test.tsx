import {render, fireEvent} from '@testing-library/react';
import React from "react";
import configureStore from 'redux-mock-store'
import {Provider} from "react-redux";
import {CREATE_GAME} from "../../../store/game/types";
import CreateGameForm from "./CreateGameForm";

describe('CreateGameForm', () => {

  const mockStore = configureStore()({});

  it('should dispatch createGame', () => {
    const {getByText, getByPlaceholderText} = render(<Provider store={mockStore}><CreateGameForm /></Provider>);
    const input = getByPlaceholderText(/enter your name/i);
    fireEvent.change(input, {target: {value: 'john'}});
    const button = getByText(/create game/i);
    button.click();
    expect(mockStore.getActions()[0].payload.action).toEqual(CREATE_GAME)
  });

});
