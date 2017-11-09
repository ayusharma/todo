/**
 * Created by pgotthardt on 14/01/16.
 */
export function toggleTodoState(id) {
    return {
        type: 'TODO_TOGGLE_DONE',
        id
    };
}

export function addTodo(text) {
    return {
        type: 'ADD_TODO',
        text
    }
}

/**
 * Set filter action
 * @param {string} filter 
 */
export function setFilter(filter) {
    return {
      type: 'SET_FILTER',
      filter
    };
}