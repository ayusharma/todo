import deepFreeze from "deep-freeze";
import { todoChangeHandler } from "../../src/js/state";

describe("todo reducer", () => {
  it("add todo", () => {
    const state = [];

    const action = {
      type: "ADD_TODO",
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
});
