const form = document.querySelector("[data-form]");
const check = document.querySelectorAll("[data-checkbox]");
const deleteBtn = document.querySelectorAll("[data-delete]");

let tasksArray = [];

window.onload = function () {
  loadTasks();
};

function addElement(e) {
  e.preventDefault();
  const inputValue = form.task.value.trim();

  if (inputValue.length >= 1) {
    tasksArray.push(inputValue);
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));

    newElement(inputValue);
    form.reset();
  } else {
    alert("Adicione uma tarefa!");
  }
}

// FUNCTION TO CHECK TASK
function handleCheck(e) {
  const item = e.target.closest("[data-item]");

  e.target.classList.toggle("checked");
  e.target.parentNode.classList.toggle("checked");
}

check.forEach((element) => {
  element.addEventListener("click", handleCheck);
});

// FUNCTION TO DELETE TASK
function handleDelete(e) {
  const item = e.target.closest("[data-item]");
  const taskText = item.querySelector("p").innerText;
  const taskIndex = tasksArray.indexOf(taskText);

  if (taskIndex !== -1) {
    tasksArray.splice(taskIndex, 1);
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
    item.remove();
  }
}

deleteBtn.forEach((element) => {
  element.addEventListener("click", handleDelete);
});

function newElement(taskText) {
  const container = document.querySelector("[data-container]");

  // CREATE A ITEM
  const div = document.createElement("div");
  div.classList.add("task-item");
  div.setAttribute("data-item", "");
  container.appendChild(div);

  // CREATE A CHECKBOX
  const checkbox = document.createElement("div");
  checkbox.classList.add("checkbox");
  div.appendChild(checkbox);
  checkbox.addEventListener("click", handleCheck);

  // CREATE NAME TASK
  const p = document.createElement("p");
  p.innerText = taskText;
  div.appendChild(p);

  // CREATE A DELETE ICON
  const deleteBtn = document.createElement("img");
  deleteBtn.setAttribute("src", "./assests/img/garbage.svg");
  deleteBtn.setAttribute("alt", "garbage icon");
  deleteBtn.setAttribute("data-delete", "");
  div.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", handleDelete);
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasksArray");
  if (savedTasks) {
    tasksArray = JSON.parse(savedTasks);
    tasksArray.forEach((task) => newElement(task));
  }
}

form.addEventListener("submit", addElement);
