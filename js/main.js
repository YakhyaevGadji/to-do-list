const btnTask = document.querySelector('[data-add-new]');
const taskList = document.querySelector('#tasksList');
const taskInput = document.querySelector('#taskInput');
const emptyList = document.querySelector('#emptyList');

btnTask.addEventListener('click', addNewTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);

function addNewTask(event) {
    event.preventDefault();

    //Создает Html разметку
    taskList.insertAdjacentHTML('beforeend', setTaskElement());

    //Сброс текста в инпуте
    taskInput.value = '';

    //Проверка пустой ли список
    checkTaskList();
}
function setTaskElement() {
    //Создаем пункт списка
    const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
    <span class="task-title">${taskInput.value}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>`;
    return taskHTML;
}
function checkTaskList() {
    if(taskList.children.length > 1) {
        emptyList.classList.add('none');
    }else {
        emptyList.classList.remove('none');
    }
}
function deleteTask(event) {
    if(event.target.dataset.action === 'delete') {
        const taskElement =  event.target.closest('.list-group-item');
        taskElement.remove();
        checkTaskList();
    }
}
function doneTask(event) {
    if(event.target.dataset.action === 'done') {
        const taskElement = event.target.closest('.list-group-item');
        const taskTitle = taskElement.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');
    }
}
