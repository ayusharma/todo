import '../css/main.css';
import '../css/todo.scss';

import {todos} from './state';
import {render} from './view';
import {registerEventHandlers} from './events';

todos.subscribe(newState => {
    localStorage['todo'] = JSON.stringify(newState);
    return render(document.body, newState)
});

render(document.body, todos.getState());
registerEventHandlers();
