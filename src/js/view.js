import {isEnabled} from './lib/feature';
import {
  elementOpen,
  elementClose,
  text,
  patch,
  elementVoid
} from 'incremental-dom';

/**
 * Render Header
 */
const header = () => {
    elementOpen('h1',null,['class','heading']);
    elementOpen('i',null,['class','material-icons']);
    text('done_all');
    elementClose('i');
    text('Just do');
    elementClose('h1');
}

/**
 * Render Input box to insert tasks
 */
const renderInputBox = () => {
  elementOpen('div', null, ['class', 'todo__input']);
  elementOpen('form', null, ['onsubmit', 'return false']);
  elementOpen('input', null, [
    'type',
    'text',
    'id',
    'todoInput',
    'class',
    '',
    'placeholder',
    'Add a task'
  ]);
  elementClose('input');
  elementOpen('button', null, [
    'id',
    'addTodo',
    'type',
    'submit',
    'hidden',
    'true'
  ]);
  text('Add');
  elementClose('button');
  elementClose('form');
  elementClose('div');
};

/**
 * Render items in to do list
 * @param {object} todo 
 */
const renderTodoItems = todo => {
  console.log(todo);
  const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
  const checked = todo.done ? true : false;
  elementOpen('li', todo.id, ['class', 'todo__list-element']);
  elementOpen('div');
  elementVoid('input', undefined, ['type', 'checkbox', 'class', 'js_toggle_todo'], 'data-id', todo.id).checked = checked;
  elementClose('div');
  elementOpen('div');
  elementOpen('label', null, null, 'class', `${todoClass} todo__text`);
  text(todo.text);
  elementClose('label');
  elementClose('div');
  elementOpen('div');
  elementOpen('i', null, ['class', 'material-icons todo__remove'], 'data-id', todo.id);
  text('close');
  elementClose('i');
  elementClose('div');
  elementClose('li');
};

/**
 * Tasks config
 */
const NoAllTasks = () => text('💯 Let\'s make some plans');
const NoOpenTasks = () => text('👏 Nothing Here');
const NoCloseTasks = () => text('👨‍💻 Nothing Here');
/**
 * Nothing Here Template 
 */
const renderNothingHere = (filter) => {
  elementOpen('li', null, ['class', 'todo__text-center']);
  if (filter === 'ALL') {
    NoAllTasks();
  }
  if (filter === 'OPEN'){
    NoOpenTasks();
  }
  if (filter === 'CLOSED') {
    NoCloseTasks();
  }
  elementClose('li');
}

/**
 * To Do list wrapper
 * @param {array} state 
 */
const renderTodoList = state => {
  elementOpen('ul', null, ['class', 'todo']);
  state.todoItems.forEach(element => {
    renderTodoItems(element);
  });
  if (state.todoItems.length === 0){
    renderNothingHere(state.filter);
  }
  elementClose('ul');
};

/**
 * Add status filtering bar
 * @param {string} filter OPEN/CLOSED/ALL
 */
const renderFilterBar = filter => {
  console.log(filter);
  const config = [
    { value: 'ALL', display: 'All' },
    { value: 'OPEN', display: 'Open' },
    { value: 'CLOSED', display: 'Closed' }
  ];
  elementOpen('div', null, ['class', 'todo__filter__bar']);
  config.forEach(e => {
    elementVoid(
      'input',
      undefined,
      ['type', 'radio', 'name', 'filters', 'class', 'js_toggle_filter'],
      'value',
      e.value
    ).checked =
      filter === e.value ? true : false;
    elementOpen('span');
    text(e.display);
    elementClose('span');
  });
  elementClose('div');
};

/**
 * Initiate app rendering
 * @param {object} data 
 */
function renderPart(data) {
  const {todoItems, filter} = data;
  elementOpen('div', null, ['id', 'app']);
  header();
  elementOpen('div', null, ['class','card'])
  renderApp(data);
  elementClose('div')
  elementClose('div');
}


/**
 * Render App to DOM
 * @param {string} elm 
 * @param {object} state 
 */
export function render(elm, state) {
    console.log(state);
    const { filter } = state;
    const todoItems = filterTodoItem(filter, state.todos);
    console.log(todoItems);
    patch(elm, renderPart, {filter,todoItems});
}

/**
 * Filters todos according to filter
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

/**
 * Render app according to URL Parameters
 * @param {object} data - state
 * @returns {function} App
 */
function renderApp(data) {
  const status = {
    renderBottom: isEnabled('renderBottom'),
    filter: isEnabled('filter'),
    filterTop: isEnabled('filterTop')
  };

  if (status.renderBottom && status.filter && status.filterTop) {
    return renderFilterTop(data);
  }

  if (status.renderBottom && status.filter) {
    return renderAddTodoAtBottomWithFilter(data);
  }
  if (status.renderBottom) {
    return renderAddTodoAtBottom(data);
  }

  if (status.filter) {
    return renderStatusFilterBar(data);
  }

  return renderAddTodoAtTop(data);
}

/**
 * Render Todo at top. Default URL parameter.
 * @param {object} data - store
 */
function renderAddTodoAtTop(data) {
    renderInputBox();
    renderTodoList(data);
}

/**
 * Render tood at bottom - #renderBottom
 * @param {object} data - store
 */
function renderAddTodoAtBottom(data) {
    renderTodoList(data);
    renderInputBox();
}

/**
 * Render addToDo at bottom with filter - #filter#renderBottom
 * @param {object} data - store
 */
function renderAddTodoAtBottomWithFilter(data) {
    renderTodoList(data);
    renderInputBox();
    renderFilterBar(data.filter);
}

/**
 * Render filter bar the bottom - #filter
 * @param {object} data - store
 */
function renderStatusFilterBar(data) {
    renderInputBox();
    renderTodoList(data);
    renderFilterBar(data.filter);
}

/**
 * Render filter bar at the top - #filter#renderBottom#filterTop
 * @param {object} data - store
 */
function renderFilterTop(data) {
    renderFilterBar(data.filter);
    renderTodoList(data);
    renderInputBox();
}
