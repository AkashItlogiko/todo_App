//find the elements
const container = document.querySelector('.container');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#inputTodo');
const todoAddButton = document.querySelector('#addTodoButton');
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
const createTodo = (todoId, todoValue) => {
  const todoElement = document.createElement('li');
  todoElement.id = todoId;
  todoElement.classList.add('li-style');
  todoElement.innerHTML = `
  <span>${todoValue}</span>
  <span> <button class="btn" id="deleteButton"> <i class="fa fa-trash"> </i> </button> </span>
  `;
  todoLists.appendChild(todoElement);

  const deleteButton = todoElement.querySelector('#deleteButton');
  deleteButton.addEventListener('click', deleteTodo);
};

const deleteTodo = () => {
  console.log('delete todo');
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
  console.log(todoId);
  createTodo(todoId, todoValue);
  showMessage('Todo is added', 'success');

  const todos = localStorage.getItem('mytodos')
    ? JSON.parse(localStorage.getItem('mytodos'))
    : [];
  todos.push({ todoId, todoValue });
  localStorage.setItem('mytodos', JSON.stringify(todos));
};

todoInput.value = '';

//adding listeners

todoForm.addEventListener('submit', addTodo);
