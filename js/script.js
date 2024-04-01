'use strict';

const input = document.querySelector('.todo--input');
const addBtn = document.querySelector('.form--btn');
const listContainer = document.querySelectorAll('.list--container');
const form = document.querySelector('.todo--form');
const deleteBtn = document.querySelectorAll('.btn--delete');
// Modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.fa-close');
const editInput = document.querySelector('.edit--value');

let title, date, id, todo;
let todos = [];
let isChecked;

// Create a todo and
function _createTodo(e) {
  e.preventDefault(); // Prevents the default form submission behaviour

  // Gets the current data and time in a localized format
  date = new Date().toLocaleString();

  // Generates a unique id for todo item based on the current timestamp
  id = (Date.now() + '').slice(-4);

  // gets the input value entered by the user as the todo title
  title = input.value;
  isChecked = false;
  // if input title is empty, exit the function
  if (title === '') return;

  // Constructs HTML for the todo item using template literals
  const html = `<li class="todo__list--container" data-id="${id}">
          <input type="checkbox" class="checked"/>
          <span>${title}</span>
          <button class="btn btn--edit">Edit</button>
          <button class="btn btn--delete">Delete</button>
        </li>`;

  // inserts the HTML for the todo item after the form element
  form.insertAdjacentHTML('afterend', html);

  // clear input
  input.value = '';

  // creates todo object
  todo = {
    id: id,
    title: title,
    date: date,
    isChecked: isChecked,
  };
  console.log(todo);

  // Adds the todo object to the todos array
  todos.push(todo);
}
addBtn.addEventListener('click', _createTodo);

let todoListId;
listContainer.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const target = e.target;
    const editBtn = target.closest('.btn--edit');
    const deleteBtn = target.closest('.btn--delete');
    const todoList = target.closest('.todo__list--container');

    if (editBtn) {
      todoListId = todoList.dataset.id;
      _openModal();
    }
    if (deleteBtn) {
      console.log(deleteBtn);
      // calling deletTodo function
      _deleteTodo(e);
    }
    //  targets the checkbox element
    const checkbox = target.closest('.checked');
    if (checkbox) {
      // gets id of the checkbox todo parent element
      // const todoId = checkbox.parentElement.dataset.id; we dont't need it as we have already defined todoListId in the function scope

      // find the todo with id of todo ===  todoListId
      const todo = todos.find((todo) => todo.id === todoListId);
      if (todo) {
        // manages the
        todo.isChecked = checkbox.checked;
        console.log(todo);
        // Updating Ui
        const text = checkbox.nextElementSibling;
        if (checkbox.checked) {
          text.style.textDecoration = 'line-through';
        } else {
          text.style.textDecoration = 'none';
        }
      }
    }
  });
});

function _updateTodo(todoId, newTitle) {
  // find the todo item with the matching id
  const todoToUpdate = todos.find((todo) => todo.id === todoId);

  if (!todoToUpdate) return;
  // if the todo item is found, update its title
  todoToUpdate.title = newTitle;

  // update ui
  document.querySelector('span').textContent = newTitle;
  console.log(todo);
}

// Save updated todo
// save button form the model form
const save = document.querySelector('.save');
save.addEventListener('click', function (e) {
  e.preventDefault();

  // get new title form the input field
  const newTitle = editInput.value.trim();

  // if the new title is empty, return early
  if (!newTitle) return;

  // Get id of the todo to update
  const todoToUpdate = todoListId;
  console.log(todoToUpdate);

  // Update the todo with new todo and close model
  _updateTodo(todoToUpdate, newTitle);
  _closeModal();
});

closeBtn.addEventListener('click', _closeModal);
function _openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  editInput.focus();
}

function _closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  editInput.value = '';
}
// delete todo
function _deleteTodo(e) {
  // checks for the deleteBtn el
  const deleteBtn = e.target.closest('.btn--delete');
  if (!deleteBtn) return;
  // gets the listEl respective to delteBtn, that is parentEl
  const todoListEl = deleteBtn.parentElement;
  const todoId = todoListEl?.dataset?.id;
  console.log(todoId);
  const deleteTodoId = deleteBtn.parentElement.dataset.id;
  console.log(deleteTodoId);
  todos = todos.filter((todo) => todo.id !== todoId);
  // removes the respective todo list element
  todoListEl.remove();
  console.log(todos);
}

// Previous used code
// let listId;
// listContainer.addEventListener('click', function (e) {
//   // targets the element
//   const target = e.target;
//   // targets todo-item
//   const listEl = target.closest('.todo__list--container');
//   // if listEl is empty, exit function
//   if (!listEl) return;
//   // get todo list id
//   listId = listEl?.dataset?.id;
//   // const editBtn = target.closest('.btn--edit');
//   // if (editBtn) {
//   //   editBtn.addEventListener('click', function (e) {
//   //     const editBtn = e.target.closest('.btn--edit');
//   //     if (!editBtn) return;
//   //     console.log(editBtn);
//   //     _openModal();
//   //   });
//   // }

//   // targets the checkbox element
//   const checkbox = target.closest('.checked');
//   if (checkbox) {
//     // gets id of the checkbox todo parent element
//     const todoId = checkbox.parentElement.dataset.id;
//     // find the todo with id of todo ===  todoId
//     const todo = todos.find((todo) => todo.id === todoId);
//     if (todo) {
//       // manages the
//       todo.isChecked = checkbox.checked;
//       console.log(todo);
//       // Updating Ui
//       const text = checkbox.nextElementSibling;
//       if (checkbox.checked) {
//         text.style.textDecoration = 'line-through';
//       } else {
//         text.style.textDecoration = 'none';
//       }
//     }
//   }
//   return listId;
// });

// // event listener for the edit buttons
// document.addEventListener('click', function (e) {
//   const editBtn = e.target.closest('.btn--edit');
//   if (!editBtn) return;
//   console.log(editBtn);
//   _openModal();
// });
