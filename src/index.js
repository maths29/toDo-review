import './style.css';
import {
  displayTasksOnWebPage, addItem, removeItem, storageInfo,
} from './modules/AddandRemoveTask.js';
// eslint-disable-next-line no-unused-vars
import clearCompleted from './modules/ClearDoneTask.js';

const TaskListBlock = document.querySelector('.todo-block');
const addInTodo = document.querySelector('.form');

window.addEventListener('load', () => {
  displayTasksOnWebPage();
});

addInTodo.addEventListener('submit', (e) => {
  e.preventDefault();
  addItem();
});

TaskListBlock.addEventListener('click', (e) => {
  if (e.target.id === 'delete') {
    removeItem(e);
  }
  const checkMark = document.createElement('button');
  const insertInput = document.createElement('input');
  if (e.target.id === 'pen') {
    e.target.addEventListener('click', () => {
      insertInput.remove();
      checkMark.remove();
    });

    const top = e.target.parentElement.parentElement.children[0];
    const targetElement = e.target.parentElement.parentElement.children[0].children[1];

    checkMark.className = 'checkEdit';
    checkMark.innerHTML = '<i class="fa-solid fa-check fa-xl"></i>';
    insertInput.placeholder = 'Edit your task';
    insertInput.type = 'text';
    insertInput.className = 'editInput';
    top.appendChild(insertInput);
    top.appendChild(checkMark);

    const one = e.target.parentElement.parentElement.children[0].children[3];

    if (one.className === 'checkEdit') {
      const two = e.target.parentElement.parentElement.children[0].children[2];
      one.onclick = function check(e) {
        if (!two.value) {
          const three = e.target.parentElement.parentElement.parentElement.children[0].children[1];
          targetElement.innerHTML = three.innerHTML;
          insertInput.remove();
          checkMark.remove();
        } else {
          targetElement.innerHTML = two.value;
          insertInput.remove();
          checkMark.remove();
          const Info = storageInfo();
          Info[targetElement.id - 1].description = two.value;
          localStorage.setItem('TasksInfo', JSON.stringify(Info));
        }
      };
    }
  }
});
const complete = document.getElementsByClassName('clearBtn')[0];
complete.addEventListener('click', () => {
  clearCompleted();
});
