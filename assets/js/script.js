let taskIdCounter = 0;
const formEl = document.querySelector('#task-form');
const tasksToDoEl = document.querySelector('#tasks-to-do');
const pageContentEl = document.querySelector('#page-content');

const taskFormHandler = event => {

    event.preventDefault();

    const taskNameInput = document.querySelector("input[name='task-name']").value;
    const taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form completely!");
        return false;
    }

    formEl.reset();

    const taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);
}

const createTaskEl = taskDataObj => {
    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    // add task id as custom attribute
    listItemEl.setAttribute('data-task-id', taskIdCounter);
    
    const taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    listItemEl.appendChild(taskInfoEl);

    // store createTaskActions in var, then append it to the list item
    const taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
}

const createTaskActions = taskId => {
    const actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    // create edit button
    const editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.className = 'btn edit-btn';
    editButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.className = 'btn delete-btn';
    deleteButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // create task item dropdown
    const statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute('name', 'status-change');
    statusSelectEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(statusSelectEl);

    const statusChoices = ['To Do', 'In Progress', 'Completed'];

    for (let i=0; i < statusChoices.length; i++) {
        //create option element
        const statusOptionEl = document.createElement('option');
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute('value', statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }


    return actionContainerEl;
}

formEl.addEventListener('submit', taskFormHandler);

const taskButtonHandler = event => {
    // get target element from event
    const targetEl = event.target;
    
    // edit button clicked
    if (targetEl.matches('.edit-btn')) {
        const taskId = targetEl.getAttribute('data-task-id');
        editTask(taskId);
    }

    // delete button clicked
    if (targetEl.matches('.delete-btn')) {
        const taskId = targetEl.getAttribute('data-task-id');
        deleteTask(taskId);
    }
}

const editTask = taskId => {
    console.log('editing task #' + taskId );

    // get task list item element
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content for task name and type
    const taskName = taskSelected.querySelector('h3.task-name').textContent;

    const taskType = taskSelected.querySelector('span.task-type').textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector('#save-task').textContent = 'Save Task';

    formEl.setAttribute('data-task-id', taskId);
}

const deleteTask = taskId => {
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

pageContentEl.addEventListener('click', taskButtonHandler);