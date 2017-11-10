import {isEnabled} from './lib/feature';

export function render(el, state) {
    console.log(state);
    const { filter } = state;
    const todoItems = filterTodoItem(filter,state.todos).map(renderTodoItem).join('');
    el.innerHTML = `
            <div id="app" class="todo__text-center">
            ${renderHeading()}
            ${renderApp(renderInput(), renderTodos(todoItems), renderStatusFilters(filter))}
            </div>
            `;
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
    const status = {
        renderBottom: isEnabled('renderBottom'),
        filter: isEnabled('filter'),
        filterTop: isEnabled('filterTop')
    }

    if (status.renderBottom && status.filter && status.filterTop) {
        return renderFilterTop(input, todoList, filterBar);
    }

    if (status.renderBottom && status.filter) {
        return renderAddTodoAtBottomWithFilter(input, todoList, filterBar);
    }
    if (status.renderBottom) {
        return renderAddTodoAtBottom(input, todoList);
    } 

    if (status.filter) {
        return renderStatusFilterBar(input, todoList, filterBar);
    }
      
    return renderAddTodoAtTop(input, todoList);
}

function renderAddTodoAtTop(input, todoList) {
    return `
        ${input}
        ${todoList}
    `;
}

function renderAddTodoAtBottom(input, todoList) {
    return `
        ${todoList}
        ${input}
        `;
}

/**
 * Render addToDo at bottom with filter - #filter#renderBottom
 * @param {string} input 
 * @param {string} todoList 
 * @param {string} filterBar 
 * @returns {string} App template
 */
function renderAddTodoAtBottomWithFilter(input, todoList, filter) {
  return `
        ${todoList}
        ${input}
        ${filter}
        `;
}

/**
 * Render filter bar the bottom - #filter
 * @param {string} input 
 * @param {string} todoList 
 * @param {string} filterBar 
 * @returns {string} App template
 */
function renderStatusFilterBar(input, todoList, filterBar) {
  return `
        ${input}
        ${todoList}
        ${filterBar}
        `;
}

/**
 * Render filter bar at the top - #filter#renderBottom#filterTop
 * @param {string} input 
 * @param {string} todoList 
 * @param {string} filterBar 
 * @returns {string} App template
 */
function renderFilterTop(input, todoList, filterBar) {
    return `
        ${filterBar}
        ${todoList}
        ${input}
        `;
}

function renderInput() {
    return `<div class="todo__input">
                <form>
                    <input type="text" id="todoInput" placeholder="Add a task" required />
                    <button id="addTodo" type="submit" hidden="true">Add</button>
                </form>
            </div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="todo__list-element">
                <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}" ${todo.done ? " checked" : ""}>
                <label class="${todoClass} todo__text ">${todo.text}</label>
            </li>`;
}

/**
 * Add status filtering bar
 * @param {string} filter OPEN/CLOSED/ALL
 * @returns {string} template to render according to filter
 */
function renderStatusFilters(filter) {
    return `<div class="todo__filter__bar">
                <input type="radio" class="js_toggle_filter" 
                    value="ALL" name="status"  ${filter === "ALL" ? " checked" : ""}/> <span>All</span>
                <input type="radio" class="js_toggle_filter" 
                    value="OPEN" name="status"  ${filter === "OPEN" ? " checked" : ""}/> <span>Open</span>
                <input type="radio" class="js_toggle_filter" 
                    value="CLOSED" name="status"  ${filter === "CLOSED" ? " checked" : ""}/> <span>Closed</span>
            </div>`;
}

function renderHeading() {
    return `<div><h1>Just do</h1></div>`;
}