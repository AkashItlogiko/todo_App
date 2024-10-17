import { Todo } from './classes/Todo.js';

//find the elements
const container = document.querySelector('.container');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#inputTodo');

const todoLists = document.getElementById('lists');
const messageElement = document.getElementById('message');

const showMessage = (text, status) => {
  messageElement.textContent = text;
  messageElement.classList.add(`bg-${status}`);
  setTimeout(() => {
    messageElement.textContent = '';
    messageElement.classList.remove(`bg-${status}`);
  }, 1000);
};

// careateTodo
const createTodo = newTodo => {
  const todoElement = document.createElement('li');
  todoElement.id = newTodo.todoId;
  todoElement.classList.add('li-style');
  todoElement.innerHTML = `
  <span>${newTodo.todoValue}</span>
  <span> <button class="btn" id="deleteButton"> <i class="fa fa-trash"> </i> </button> </span>
  `;
  todoLists.appendChild(todoElement);

  const deleteButton = todoElement.querySelector('#deleteButton');

  deleteButton.addEventListener('click', deleteTodo);
};

const deleteTodo = event => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;
  todoLists.removeChild(selectedTodo);
  showMessage('To do is deleted', 'danger');

  selectedTodo.id;
  let todos = getTodosFromLocalStorage();
  todos = todos.filter(todo => todo.todoId !== selectedTodo.id);
  localStorage.setItem('mytodos', JSON.stringify(todos));
};

const getTodosFromLocalStorage = () => {
  return localStorage.getItem('mytodos')
    ? JSON.parse(localStorage.getItem('mytodos'))
    : [];
};

const addTodo = event => {
  event.preventDefault();
  const todoValue = todoInput.value;

  //unique id
  const todoId = Date.now().toString();
  const newTodo = new Todo(todoId, todoValue);
  console.log(newTodo);

  createTodo(newTodo);
  showMessage('Todo is added', 'success');

  const todos = localStorage.getItem('mytodos')
    ? JSON.parse(localStorage.getItem('mytodos'))
    : [];
  todos.push(newTodo);
  localStorage.setItem('mytodos', JSON.stringify(todos));
};

todoInput.value = '';

//adding listeners
const loadTodos = () => {
  const todos = getTodosFromLocalStorage();
  todos.map(todo => createTodo(todo));
};

todoForm.addEventListener('submit', addTodo);
window.addEventListener('DOMContentLoaded', loadTodos);
