import {userHasWon} from "./Confetti";
import {Round} from "../store/game/types";

describe('userHasWon', () => {

  const WINNER_ID = '5';
  const WINNING_USER = {id: WINNER_ID, secret: 'secret'};
  const LOSING_USER = {id: '4', secret: 'secret'};
  const PREVIOUS_WITH_WINNER: Round = {
    question: '',
    number: 1,
    answers: [{text: '', isWinner: true, votes: [{id: WINNER_ID, name: 'ASD'}]}]
  };
  const PREVIOUS_WITHOUT_WINNER: Round = {
    ...PREVIOUS_WITH_WINNER,
    answers: [{text: '', isWinner: false, votes: [{id: WINNER_ID, name: 'ASD'}]}]
  };

  it('should return false when no user', () => {
    expect(userHasWon(null, PREVIOUS_WITH_WINNER, null)).toEqual(false);
  });

  it('should return false when current round is set', () => {
    expect(userHasWon(WINNING_USER, PREVIOUS_WITH_WINNER, PREVIOUS_WITHOUT_WINNER)).toEqual(false);
  });

  it('should return false when there is no winner', () => {
    expect(userHasWon(WINNING_USER, PREVIOUS_WITHOUT_WINNER, null)).toEqual(false);
  });

  it('should return false when user is not winner', () => {
    expect(userHasWon(LOSING_USER, PREVIOUS_WITH_WINNER, null)).toEqual(false);
  });

  it('should return true', () => {
    expect(userHasWon(WINNING_USER, PREVIOUS_WITH_WINNER, null)).toEqual(true);
  })

});
