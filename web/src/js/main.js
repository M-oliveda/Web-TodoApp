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

function setUpSessionStorage() {
  window.sessionStorage.setItem("taskIdGenerator", "0");
  window.sessionStorage.setItem("tasks", JSON.stringify([]));
}

window.addEventListener("load", () => {
  setTimeCalendar();
  setUpSessionStorage();
});

document.querySelector("#filterBoxButton").addEventListener("click", () => {
  document
    .querySelector("#filterBoxButton")
    .classList.toggle("filter-box__button-expanded");

  document
    .querySelector("#filterBoxContainer")
    .classList.toggle("filter-box__container-active");
});

document.querySelectorAll(".filter-box__filter-task").forEach((item) =>
  item.addEventListener("click", (e) => {
    if (e.target.checked) {
      filterTasks(e.target.value);
    }
  }),
);

function filterTasks(taskType) {
  document.querySelectorAll(".task").forEach((task) => {
    task.parentElement.style = null;
  });

  if (taskType == "in progress") {
    document.querySelectorAll(".task__icon-completed").forEach((task) => {
      task.parentElement.parentElement.style = "display: none;";
    });
  } else if (taskType == "completed") {
    document.querySelectorAll(".task").forEach((task) => {
      task.parentElement.style = "display: none";
    });
    document.querySelectorAll(".task__icon-completed").forEach((task) => {
      task.parentElement.parentElement.style = "display: block;";
    });
  }
}

document
  .querySelector("#addNewTask")
  .addEventListener("click", () => addNewTask());

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

  newTask.setAttribute(
    "taskId",
    (parseInt(window.sessionStorage.getItem("taskIdGenerator")) + 1).toString(),
  );

  newTask.setAttribute("completed", "false");

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

    const tasks = JSON.parse(window.sessionStorage.getItem("tasks"));

    if (
      tasks.some(
        (task) => task.taskId == e.target.parentElement.getAttribute("taskId"),
      )
    ) {
      tasks[
        tasks.findIndex(
          (task) =>
            task.taskId == e.target.parentElement.getAttribute("taskId"),
        )
      ].value = e.target.value;
      window.sessionStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      const newTaskInfo = {
        taskId: e.target.parentElement.getAttribute("taskId"),
        isCompleted: false,
        value: e.target.value,
      };

      tasks.push(newTaskInfo);

      window.sessionStorage.setItem("tasks", JSON.stringify(tasks));

      const newIdGeneratorValue =
        parseInt(window.sessionStorage.getItem("taskIdGenerator")) + 1;

      window.sessionStorage.setItem(
        "taskIdGenerator",
        newIdGeneratorValue.toString(),
      );
    }
  });

  newTaskDeleteIcon.setAttribute("type", "button");

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
  const tasks = JSON.parse(window.sessionStorage.getItem("tasks"));

  tasks[tasks.findIndex((task) => task.taskId == taskId)].isCompleted =
    !tasks[tasks.findIndex((task) => task.taskId == taskId)].isCompleted;

  window.sessionStorage.setItem("tasks", JSON.stringify(tasks));

  taskCompletedValue = document
    .querySelector(`[taskId='${taskId}']`)
    .getAttribute("completed");

  if (taskCompletedValue == "false") {
    document
      .querySelector(`[taskId='${taskId}']`)
      .setAttribute("completed", "true");
  } else {
    document
      .querySelector(`[taskId='${taskId}']`)
      .setAttribute("completed", "false");
  }
}

function deleteTask(taskId) {
  const tasks = JSON.parse(window.sessionStorage.getItem("tasks"));

  window.sessionStorage.setItem(
    "tasks",
    JSON.stringify(tasks.filter((task) => task.taskId != taskId)),
  );
}
