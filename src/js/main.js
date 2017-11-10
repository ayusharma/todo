import '../css/main.css';
import '../css/todo.scss';

import {todos} from './state';
import {render} from './view';
import {registerEventHandlers} from './events';

todos.subscribe(() => {
    return render(document.body, todos.getState());
});

render(document.body, todos.getState());
registerEventHandlers();
