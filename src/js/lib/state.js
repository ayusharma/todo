export function createStore(reducer, initial = {}) {
    const listeners = [];
    let state = initial;
    return {
        dispatch(change) {
            state = reducer(state, change) || state;
            for(let listener of listeners) {
                listener(state);
            }
        },

        getState() {
            return state;
        },

        subscribe(listener) {
            listeners.push(listener);
        }
    };
}

export function combineReducers(reducers) {
  return (state = {}, change) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], change);
      return nextState;
    }, {});
  };
};