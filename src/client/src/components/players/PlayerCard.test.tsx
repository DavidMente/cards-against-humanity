import React from 'react';
import {render} from '@testing-library/react';
import PlayerCard from "./PlayerCard";
import {Player} from "../../store/game/types";
import {authentication} from "../../services/authentication";

describe('PlayerCard', () => {

  it('should render a player who is not ready', () => {
    const player: Player = {id: '123', userId: '456', points: 199, status: 'NOT_READY', name: 'jonathan'};
    const {queryByText, getByText} = render(<PlayerCard player={player} />);
    expect(queryByText(/jonathan/i)).toBeTruthy();
    expect(getByText(/jonathan/i).classList).not.toContain('has-text-primary');
    expect(queryByText(/score: 199/i)).toBeTruthy();
    expect(queryByText(/ready/i)).toBeNull();
  });

  it('should render the ready status correctly', () => {
    const player: Player = {id: '123', userId: '456', points: 199, status: 'READY', name: 'jonathan'};
    const {queryByText} = render(<PlayerCard player={player} />);
    expect(queryByText(/ready/i)).toBeTruthy();
  });

  it('should indicate player identity through text color', () => {
    const USER_ID = '5';
    authentication.storeUser({id: USER_ID, secret: '6'});
    const player: Player = {id: '123', userId: USER_ID, points: 199, status: 'READY', name: 'jonathan'};
    const {getByText} = render(<PlayerCard player={player} />);
    expect(getByText(/jonathan/i).classList).toContain('has-text-primary');
  })

});
