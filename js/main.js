const btnTask = document.querySelector('[data-add-new]');
const taskList = document.querySelector('#tasksList');
const taskInput = document.querySelector('#taskInput');
const emptyList = document.querySelector('#emptyList');

btnTask.addEventListener('click', addNewTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);

let tasks = [];

if(localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => {
    renderTasks(task);
});
}



checkTaskList();

function addNewTask(event) {
    event.preventDefault();

    const newTask = {
        id: Date.now(),
        title: taskInput.value,
        done: false
    };

    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

    const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newTask.title}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>`;


    //Создает Html разметку
    taskList.insertAdjacentHTML('beforeend', taskHTML);

    //Заполняем массив
    tasks.push(newTask);

    //Сброс текста в инпуте
    taskInput.value = '';

    checkTaskList();
    saveToLocalStorage();
}
function checkTaskList() {
    if(tasks.length === 0) {
        const emptyListHtml = `<li id="emptyList" class="list-group-item empty-list">
				<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
			<div class="empty-list__title">Список дел пуст</div>
		</li>`;
        taskList.insertAdjacentHTML('afterbegin', emptyListHtml);
    }else {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}
function deleteTask(event) {
    if(event.target.dataset.action === 'delete') {
        const taskElement =  event.target.closest('.list-group-item');

        tasks = tasks.filter((task) => {
            return task.id !== Number(taskElement.id);
        });


        taskElement.remove();
        checkTaskList();
        saveToLocalStorage();
    }
}
function doneTask(event) {
    if(event.target.dataset.action === 'done') {
        const taskElement = event.target.closest('.list-group-item');

        const task = tasks.find((task) => {
            return task.id === Number(taskElement.id);
        });
        
        task.done = !task.done;

        const taskTitle = taskElement.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');

        saveToLocalStorage();
    }
}
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTasks(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${task.title}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>`;


    //Создает Html разметку
    taskList.insertAdjacentHTML('beforeend', taskHTML);
}