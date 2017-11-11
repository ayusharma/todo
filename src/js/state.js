import { createStore, combineReducers, applyMiddleware } from 'redux';
import uuid from './lib/uuid';

const initialState = {
    todos: [
        {
            id: 'f1cb6925-c158-6134-3e05-ebbdeecf2c8e',
            text: '🎉 Let\'s party tonight',
            done: true
        },
        {
            id: '6b4524d6-26e5-34ab-8a85-b9649b82d017',
            text: '✈️ Filght to Germany',
            done: false
        },
        {
            id: '19d3ec08-ac7b-36aa-d97f-887a984180ec',
            text: '🏩 Book hotel on Trivago',
            done: false
        },
        {
            id: '03682dca-de31-5e25-7bcd-da13acc8d17d',
            text: '💻 Start develop To Do App',
            done: false
        },
        {
            id: 'f5b99b4e-dba6-f800-f891-755a2285549a',
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
                id: uuid(),
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
    