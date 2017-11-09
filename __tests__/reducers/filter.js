import deepFreeze from 'deep-freeze';
import {filterChangeHandler} from '../../src/js/state';

describe('filter reducer', () => {
  it('Change filter', () => {
    const state = 'ALL'

    const action = {
      type: 'SET_FILTER',
      filter: 'OPEN'
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(filterChangeHandler(state, action)).toEqual('OPEN');
  });
});
