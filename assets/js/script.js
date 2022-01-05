let taskIdCounter = 0;

const formEl = document.querySelector('#task-form');
const tasksToDoEl = document.querySelector('#tasks-to-do');
const tasksInProgressEl = document.querySelector('#tasks-in-progress');
const tasksCompletedEl = document.querySelector('#tasks-completed');
const pageContentEl = document.querySelector('#page-content');

const tasks = []

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

    // check if task is new or one being edited by seeing if it has a data-task-id attribute
    const isEdit = formEl.hasAttribute('data-task-id');

    if (isEdit) {
        const taskId = formEl.getAttribute('data-task-id');
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass createTaskEl function
    else {
        const taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: 'to do'
        };
        createTaskEl(taskDataObj);
    }

}

const createTaskEl = taskDataObj => {
    console.log(taskDataObj);
    console.log(taskDataObj.status);

    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.setAttribute('data-task-id', taskIdCounter);
    
    const taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // task actions for task: edit, delete
    const taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id = taskIdCounter;
    
    tasks.push(taskDataObj);

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

    // create status dropdown
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

const taskButtonHandler = event => {
    // get target element from event
    const targetEl = event.target;
    
    // edit button clicked
    if (targetEl.matches('.edit-btn')) {
        const taskId = targetEl.getAttribute('data-task-id');
        editTask(taskId);
    }
    // delete button clicked
    else if (targetEl.matches('.delete-btn')) {
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

const completeEditTask = (taskName, taskType, taskId) => {
    // find the matching task list item
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    // set new values
    taskSelected.querySelector('h3.task-name').textContent = taskName;
    taskSelected.querySelector('span.task-type').textContent = taskType;

    // loop throught tasks array and task object with new content
    for (let i=0; i<tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }
    console.log(tasks);
    
    alert('Task Updated!');
    
    // remove data attribute from form
    formEl.removeAttribute('data-task-id');
    // update fromEl button to go back to saying 'add task'
    document.querySelector('#save-task').textContent = 'Add Task';
}

const deleteTask = taskId => {
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold updated list of tasks
    const updatedTaskArr =[]

    // loop through current tasks
    for (let i=0; i<tasks.length; i++) {
        // if tasks[i].id !== taskId, keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as the updated tasks array
    tasks = updatedTaskArr;
}

const taskStatusChangeHandler = event => {
    // get the task item's id
    const taskId = event.target.getAttribute('data-task-id');

    // find the parent task item element based on the id
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get the currently seleted option's value and convert it to lower case
    const statusValue = event.target.value.toLowerCase();

    if (statusValue === 'to do') {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === 'in progress') {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === 'completed') {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update tasks in tasks array
    for (let i=0; i<tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    console.log(tasks);
}

// add new task
formEl.addEventListener('submit', taskFormHandler);
// edit and delete
pageContentEl.addEventListener('click', taskButtonHandler);
// change task status
pageContentEl.addEventListener('change', taskStatusChangeHandler);