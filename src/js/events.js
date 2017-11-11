import {todos} from './state';
import {listen} from './lib/events';
import {
  addTodo,
  toggleTodoState,
  setFilter,
  removeTodo
} from './actions';

export function registerEventHandlers() {
    /**
     * Add todo listenser
     */
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        if (todoInput.value){
             todos.dispatch(addTodo(todoInput.value));
             todoInput.value = '';
        }
        document.getElementById('todoInput').focus();
        event.stopPropagation();
    });

    /**
     * Toggle Todo listener
     */
    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });
    
    /**
     * set filter listener
     */
    listen('change', '.js_toggle_filter', event => {
        todos.dispatch(setFilter(event.target.value));
    });
    
    /**
     * Todo remove listener
     */
    listen('click', '.todo__remove', event => {
      const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
      todos.dispatch(removeTodo(id));
    });
}
