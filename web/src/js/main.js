function setTimeCalendar() {
  let monthSpanBox = document.querySelector("#calendarMonth");
  let dateSpanBox = document.querySelector("#calendarDate");
  let currentDate = new Date();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  monthSpanBox.appendChild(
    document.createTextNode(months[currentDate.getMonth()]),
  );
  dateSpanBox.appendChild(document.createTextNode(currentDate.getDate()));
}

function displayTasks(tasks) {
  const taskContainer = document.querySelector(".tasks");
  while (taskContainer.lastElementChild) {
    taskContainer.removeChild(taskContainer.lastElementChild);
  }

  for (let task of tasks) {
    addNewTask(task.value, task.taskId, task.isCompleted);
  }
}

function filterTasks(typeTask) {
  switch (typeTask) {
    case "completed":
      document
        .querySelector("#filterByCompletedTask")
        .classList.add("filter-selected");
      document
        .querySelector("#filterByInProgressTask")
        .classList.remove("filter-selected");
      break;
    case "in progress":
      document
        .querySelector("#filterByInProgressTask")
        .classList.add("filter-selected");
      document
        .querySelector("#filterByCompletedTask")
        .classList.remove("filter-selected");
      break;
    default:
      console.error("You insert the wrong type task filter.");
  }

  const filteredTasks = [];

  for (let index = 1; index <= window.sessionStorage.length; index++) {
    const task = JSON.parse(window.sessionStorage[index]);
    if (typeTask == "completed" && task.isCompleted) {
      filteredTasks.push(task);
    } else if (typeTask == "in progress" && !task.isCompleted) {
      filteredTasks.push(task);
    }
  }

  displayTasks(filteredTasks);
}

function addNewTask(taskValue, taskId, isCompleted) {
  const newTaskContainer = document.createElement("li");
  const newTask = document.createElement("div");
  const newTaskIcon = document.createElement("button");
  const newTaskText = document.createElement("input");
  const newTaskDeleteIcon = document.createElement("button");

  newTask.classList.add("task");
  newTaskIcon.classList.add("task__icon");
  newTaskText.classList.add("task__text");
  newTaskDeleteIcon.classList.add("task__delete-icon");

  newTask.setAttribute(
    "taskId",
    taskId || (window.sessionStorage.length + 1).toString(),
  );

  if (isCompleted) {
    newTaskIcon.classList.add("task__icon-completed");
  }

  newTaskIcon.setAttribute("type", "button");

  newTaskIcon.addEventListener("click", (e) => {
    e.target.classList.toggle("task__icon-completed");
    toggleTaskCompletion(e.target.parentElement.getAttribute("taskId"));
  });

  newTaskText.addEventListener("focusout", (e) => {
    if (newTaskText.value === "") {
      e.target.parentElement.parentElement.remove();
      return;
    }
    const taskInfo = {
      taskId: e.target.parentElement.getAttribute("taskId"),
      isCompleted: isCompleted || false,
      value: e.target.value,
    };

    window.sessionStorage.setItem(
      e.target.parentElement.getAttribute("taskId"),
      JSON.stringify(taskInfo),
    );
  });

  newTaskText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addNewTask();
    }
  });

  newTaskDeleteIcon.setAttribute("type", "button");

  newTaskDeleteIcon.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.remove();
    deleteTask(e.target.parentElement.getAttribute("taskId"));
  });

  newTaskText.value = taskValue || null;

  newTaskContainer.append(newTask);
  newTask.append(newTaskIcon, newTaskText, newTaskDeleteIcon);

  document.querySelector(".tasks").appendChild(newTaskContainer);

  newTaskText.focus();
}

function toggleTaskCompletion(taskId) {
  const taskObj = JSON.parse(window.sessionStorage.getItem(taskId));

  window.sessionStorage.setItem(
    taskId,
    JSON.stringify({ ...taskObj, isCompleted: !taskObj.isCompleted }),
  );
}

function deleteTask(taskId) {
  window.sessionStorage.removeItem(taskId);
}

window.addEventListener("load", () => setTimeCalendar());

document.querySelector("#filterBoxButton").addEventListener("click", () => {
  document
    .querySelector("#filterBoxButton")
    .classList.toggle("filter-box__button-expanded");

  document
    .querySelector("#filterBoxContainer")
    .classList.toggle("filter-box__container-active");
});

document
  .querySelectorAll(".filter-box__filter-task")
  .forEach((e) =>
    e.addEventListener("click", () => filterTasks(e.innerText.toLowerCase())),
  );

document
  .querySelector("#addNewTask")
  .addEventListener("click", () => addNewTask());
