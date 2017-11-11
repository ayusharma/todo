import { createStore, combineReducers, applyMiddleware } from 'redux';

const initialState = {
    todos: [
        {
            id: 0,
            text: '🎉 Let\'s party tonight',
            done: true
        },
        {
            id: 1,
            text: '✈️ Filght to Germany',
            done: false
        },
        {
            id: 2,
            text: '🏩 Book hotel on Trivago',
            done: false
        },
        {
            id: 3,
            text: '💻 Start develop To Do App',
            done: false
        },
        {
            id: 4,
            text: '🤳 Take selfies with monuments',
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

        case 'REMOVE_TODO':
            console.log(change);
            return state.filter(e => {
                return e.id !== change.id;
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
    