const buttonEl = document.querySelector("#save-task");
const tasksToDoEl = document.querySelector('#tasks-to-do');

const createTaskHandler = () => {
    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.textContent = 'New Task';
    tasksToDoEl.appendChild(listItemEl);
}

buttonEl.addEventListener('click', createTaskHandler);