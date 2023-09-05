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
}

function addNewTask() {
  const newTaskContainer = document.createElement("li");
  const newTask = document.createElement("div");
  const newTaskIcon = document.createElement("button");
  const newTaskText = document.createElement("input");
  const newTaskDeleteIcon = document.createElement("button");

  newTask.classList.add("task");
  newTaskIcon.classList.add("task__icon");
  newTaskText.classList.add("task__text");
  newTaskDeleteIcon.classList.add("task__delete-icon");

  newTask.setAttribute("taskId", (window.sessionStorage.length + 1).toString());

  newTaskIcon.addEventListener("click", (e) => {
    e.target.classList.toggle("task__icon-completed");
    toggleTaskCompletion(e.target.parentElement.getAttribute("taskId"));
  });

  newTaskText.addEventListener("focusout", (e) => {
    const taskInfo = {
      taskId: e.target.parentElement.getAttribute("taskId"),
      isCompleted: false,
      value: e.target.value,
    };

    window.sessionStorage.setItem(
      e.target.parentElement.getAttribute("taskId"),
      JSON.stringify(taskInfo),
    );
  });

  newTaskDeleteIcon.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.remove();
    deleteTask(e.target.parentElement.getAttribute("taskId"));
  });

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
