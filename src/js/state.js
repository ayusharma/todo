import { createStore, combineReducers, applyMiddleware } from 'redux';

const initialState = {
    todos: [
        {
            id: 0,
            text: 'Take a look at the application',
            done: true
        },
        {
            id: 1,
            text: 'Add ability to filter todos',
            done: false
        },
        {
            id: 2,
            text: 'Filter todos by status',
            done: false
        },
        {
            id: 3,
            text: 'Filter todos by text',
            done: false
        }
    ],
    filter: 'ALL'
};

/**
 * Todo reducer
 * Reducers always be pure fuctions. They should not mutate the outer state.
 * @param {array} state 
 * @param {object} change action
 */
export function todoChangeHandler(state = [], change) {
    switch(change.type) {
        case 'ADD_TODO':
            return [...state, {
                id: state.length,
                text: change.text,
                done: false
            }];

        case 'TODO_TOGGLE_DONE':
            return state.map(e => {
                if (e.id === change.id) {
                    e.done = !e.done;
                }
                return e;
            })

        default:
            return state;
    }
}

/**
 * Filter reducer
 * @param {string} state 
 * @param {object} change action
 */
export function filterChangeHandler(state = 'ALL', change) {
    switch(change.type) {
        case 'SET_FILTER':
            return change.filter;
        default:
            return state;
    }
}

/**
 * Save to localstorage
 * @param {object} store 
 */
const saver = store => next => action => {
    let result = next(action);
    localStorage['todo'] = JSON.stringify(store.getState());
    return result;
}

/**
 * Reducers
 */
const reducers = combineReducers({
    todos: todoChangeHandler,
    filter: filterChangeHandler
});

/**
 * Create Store
 */
export const todos = createStore(reducers, 
    localStorage['todo'] ? JSON.parse(localStorage['todo']) : initialState, applyMiddleware(saver));
    