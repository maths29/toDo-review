// eslint-disable-next-line no-unused-vars
import handleCheckbox from './checkBox.js';

const TaskListBlock = document.querySelector('.todo-block');

class TodoTasks {
  constructor(description, completed, id) {
    this.description = description;
    this.completed = completed;
    this.id = id;
  }

  static displayTasks = (task) => {
    const listItem = document.createElement('li');
    listItem.id = task.id;
    listItem.className = 'lists';
    if (task.completed === true) {
      listItem.innerHTML = `
          <div class="listLP">
          <input type="checkbox" name="" id="check-${task.id}" checked
          onclick="handleCheckbox(${task.id})">
          <p id="${task.id}">${task.description}</p>
          </div>
          
          <div class="trash">
          
          <i id="pen" class="fa-solid fa-pen"></i>
          <i id="delete" class="fa-solid fa-trash-can"></i>
          </div>
          `;
    } else {
      listItem.innerHTML = `
          <div class="listLP">
          <input type="checkbox" name="" id="check-${task.id}" 
          onclick="handleCheckbox(${task.id})">
          <p id="${task.id}">${task.description}</p>
          </div>
          
          <div class="trash">
          
          <i id="pen" class="fa-solid fa-pen"></i>
          <i id="delete" class="fa-solid fa-trash-can"></i>
          </div>
          `;
    }

    TaskListBlock.appendChild(listItem);
  };

  static loadFromLocalStorage() {
    let Tasks;

    if (localStorage.getItem('TasksInfo')) {
      Tasks = JSON.parse(localStorage.getItem('TasksInfo'));
    } else {
      Tasks = [];
    }
    return Tasks;
  }

  static displayTasksOnPage() {
    const Tasks = TodoTasks.loadFromLocalStorage();

    Tasks.forEach((task) => {
      TodoTasks.displayTasks(task);
    });
  }

  static removeBookFromPage(target) {
    if (target.classList.contains('trash')) {
      target.parentElement.remove();
    }
  }

  static removeFromLocalStorage(element) {
    let k = 0;
    const Tasks = TodoTasks.loadFromLocalStorage();

    const idd = element.parentElement.id;
    const newID = Number(idd);
    for (let i = 0; i < Tasks.length; i += 1) {
      if (Tasks[i].id === newID) {
        k = i;
        break;
      }
    }
    Tasks.splice(k, 1);
    let X = 1;
    Tasks.forEach((task) => {
      task.id = X;
      X += 1;
    });
    localStorage.setItem('TasksInfo', JSON.stringify(Tasks));
  }
}

export const removeItem = (e) => {
  TodoTasks.removeBookFromPage(e.target.parentElement);
  TodoTasks.removeFromLocalStorage(e.target.parentElement);
};

export const displayTasksOnWebPage = () => {
  TodoTasks.displayTasksOnPage();
};

export const addItem = () => {
  const addInput = document.querySelector('.add-input');

  if (addInput.value) {
    const complete = false;

    const loadTasks = TodoTasks.loadFromLocalStorage();
    const count = loadTasks.length + 1;
    const newTask = new TodoTasks(addInput.value, complete, count);

    loadTasks.push(newTask);

    TodoTasks.displayTasks(newTask);
    localStorage.setItem('TasksInfo', JSON.stringify(loadTasks));

    // Reset input fields
    addInput.value = '';
  }
};

export const storageInfo = TodoTasks.loadFromLocalStorage;