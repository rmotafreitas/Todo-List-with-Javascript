//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
  //Prevent form from submiting
  event.preventDefault();
  //INPUT
  if (todoInput.value == "") {
    return window.alert("Hey, please write something! :/");
  }
  if (containsTodo(todoInput.value)) {
    return window.alert("That task already exist! :/");
  }
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //ADD TODO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);
  //CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //CHECK TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //APPEND TO LIST
  todoList.appendChild(todoDiv);
  //Clear todo input value
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;
  //DElETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK TODO
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    saveConfirmedTodos(todo);
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  //Do i already have things?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  //Do i already have things?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let confirmedTodos;
  //Do i already have things?
  if (localStorage.getItem("confirmedTodos") === null) {
    confirmedTodos = [];
  } else {
    confirmedTodos = JSON.parse(localStorage.getItem("confirmedTodos"));
  }

  todos.forEach(function (todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    if(confirmedTodos.includes(todo)) {
      todo = newTodo.parentElement;
      todo.classList.toggle("completed");
    }
  });
}

function removeLocalTodos(todo) {
  let todos;
  //Do i already have thingg?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //REMOVE AN ITEM FORM AN ARRAY
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1); //First argument (the position) || Second argument (how many to remove)
  localStorage.setItem("todos", JSON.stringify(todos));
  if (containsTodoCheck(todoIndex)) {
    confirmedTodos = JSON.parse(localStorage.getItem("confirmedTodos"));
    const alreadyConfirmedIndex = todo.children[0].innerText;
    confirmedTodos.splice(confirmedTodos.indexOf(alreadyConfirmedIndex), 1);
    localStorage.setItem("confirmedTodos", JSON.stringify(confirmedTodos));
  }
}

function containsTodo(todo) {
  let todos;
  //Do i already have thing?
  if (localStorage.getItem("todos") === null) {
    return false;
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  if (todos.includes(todo)) {
    return true;
  } else {
    return false;
  }
}

function containsTodoCheck(todo) {
  let confirmedTodos;
  //Do i already have things?
  if (localStorage.getItem("confirmedTodos") === null) {
    return false;
  } else {
    confirmedTodos = JSON.parse(localStorage.getItem("confirmedTodos"));
  }
  if (confirmedTodos.includes(todo)) {
    return true;
  } else {
    return false;
  }
}


//CONFIRMED TODOS LOCAL STORAGE
function saveConfirmedTodos(confirmedTodo) {
  let confirmedTodos;
  //Do i already have things?
  if (localStorage.getItem("confirmedTodos") === null) {
    confirmedTodos = [];
  } else {
    confirmedTodos = JSON.parse(localStorage.getItem("confirmedTodos"));
  }
  if (!confirmedTodos.includes(confirmedTodo.children[0].innerText)) {
    confirmedTodos.push(confirmedTodo.children[0].innerText);
    localStorage.setItem("confirmedTodos", JSON.stringify(confirmedTodos));
  } else {
    const alreadyConfirmedIndex = confirmedTodo.children[0].innerText;
    confirmedTodos.splice(confirmedTodos.indexOf(alreadyConfirmedIndex), 1);
    localStorage.setItem("confirmedTodos", JSON.stringify(confirmedTodos));
  }
}
