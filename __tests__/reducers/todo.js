import deepFreeze from 'deep-freeze';
import { todoChangeHandler } from '../../src/js/state';

describe('todo reducer', () => {
  it('add todo', () => {
    const state = [];

    const action = {
      type: 'ADD_TODO',
      text: 'Test todo'
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(todoChangeHandler(state, action)).toEqual([
      {
        id: 0,
        text: 'Test todo',
        done: false
      }
    ]);
  });
  it('remove todo', () => {
    const state = [
      {
        id: 0,
        text: 'Take a look at the application',
        done: true
      },
      {
        id: 1,
        text: 'Add ability to filter todos',
        done: false
      }
    ];

    const action = {
      type: 'REMOVE_TODO',
      id: 0
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(todoChangeHandler(state, action)).toEqual([
      {
        id: 1,
        text: 'Add ability to filter todos',
        done: false
      }
    ]);
  });
});
