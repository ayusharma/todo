import {isEnabled} from './lib/feature';

export function render(el, state) {
    console.log(state);
    const { filter } = state;
    const todoItems = filterTodoItem(filter,state.todos).map(renderTodoItem).join('');
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems),
        renderStatusFilters(filter)
    );
}

/**
 * filters todos according to filter
 * @param {string} filter OPEN/CLOSED/ALL
 * @param {array} todos List of todos
 * @returns {array} filtered list of todos
 */
function filterTodoItem (filter, todos) {
    switch(filter) {
        case 'OPEN':
            return todos.filter(e => !e.done)
        case 'CLOSED':
            return todos.filter(e => e.done);
        default:
            return todos;
    }
}

function renderApp(input, todoList, filterBar) {
    if(isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(input, todoList);
    } else if (isEnabled('filter')) {
        return renderStatusFilterBar(input, todoList, filterBar);
    } else {
        return renderAddTodoAtTop(input, todoList);
    }
}

function renderAddTodoAtTop(input, todoList) {
    return `<div id="app">
        ${input}
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList) {
    return `<div id="app">
        ${todoList}
        ${input}
    </div>`;
}

function renderStatusFilterBar(input, todoList, filterBar) {
  return `<div id="app">
        ${input}
        ${todoList}
        ${filterBar}
    </div>`;
}

function renderInput() {
    return `<div class="todo__input">
                <form>
                    <input type="text" id="todoInput">
                    <button id="addTodo" type="submit">Add</button>
                </form>
            </div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}">
        <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}" ${todo.done ? ' checked' : ''}>
        ${todo.text}
    </li>`;
}

/**
 * Add status filtering
 * @param {string} filter OPEN/CLOSED/ALL
 * @returns {string} template to render according to filter
 */
function renderStatusFilters(filter) {
    return `<div class="todo__filter__bar">
                <input type="radio" class="js_toggle_filter" value="ALL" name="status"  ${filter === "ALL" ? " checked" : ""}/> Show All
                <input type="radio" class="js_toggle_filter" value="OPEN" name="status"  ${filter === "OPEN" ? " checked" : ""}/> Show Open
                <input type="radio" class="js_toggle_filter" value="CLOSED" name="status"  ${filter === "CLOSED" ? " checked" : ""}/> Show Closed
            </div>`;
}