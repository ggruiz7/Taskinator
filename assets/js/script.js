const formEl = document.querySelector('#task-form');
const tasksToDoEl = document.querySelector('#tasks-to-do');

const createTaskHandler = event => {

    event.preventDefault();

    const taskNameInput = document.querySelector("input[name='task-name']").value;
    const taskTypeInput = document.querySelector("select[name='task-type']").value;

    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    // div to hold task info and to list item
    const taskInfoEl = document.createElement('div');
    // give it a class name
    taskInfoEl.className = 'task-info';
    // add HTML cntent to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener('submit', createTaskHandler);