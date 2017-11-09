import {todos} from './state';
import {listen} from './lib/events';
import {
  addTodo,
  toggleTodoState,
  setFilter
} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        document.getElementById('todoInput').focus();
        event.stopPropagation();
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });

    listen('change', '.js_toggle_filter', event => {
        todos.dispatch(setFilter(event.target.value));
    });
}
