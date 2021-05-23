//Selectors
const todoInput = document.querySelector(".todo-input"); //selects element (input) with a class of todo-input
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos); //if the document is loaded display todos saved in local storage
todoButton.addEventListener("click", addTodo); //adds a click event on the button which when triggered executes a function addTodo
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(e) {
  // e (or whatever the first parameter is called) is the event that's happening when an element is triggered
  //Prevent form form submitting
  e.preventDefault();
  //Todo DIV
  const todoDiv = document.createElement("div"); //creates a div element
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; //the value of li is whatever was entered in an input
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo); //adds li to a div
  //ADD TODO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);
  //CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //APPEND TO LIST
  todoList.appendChild(todoDiv);
  //CLEAR TODO INPUT VALUE
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target; //the element that triggered the event
  //DELETE
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement; //if the element has a class of trash-btn we select the parent of said element
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo); //remove items from local storage
    todo.addEventListener("transitionend", function () {
      //after the transition is finished the item gets removed
      todo.remove();
    });
  }

  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (
      e.target.value //get the value of the element that triggered the event and display items accordingly
    ) {
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
  //CHECK - do i already have things in local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    //if there are no items in local storage create an empty array
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //if there are items in local storage get them as an array
  }
  todos.push(todo); //add items to array
  localStorage.setItem("todos", JSON.stringify(todos)); //add array as a string to a local storage
}

function getTodos() {
  //CHECK - do i alrady have things in local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
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
    //TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //CHECK - do i alrady have things in local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText; //gets the children of an element that triggered the remove event
  todos.splice(todos.indexOf(todoIndex), 1); //gets the index of said element and removes it
  localStorage.setItem("todos", JSON.stringify(todos)); //updates local storage
}
