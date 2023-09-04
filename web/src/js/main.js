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
  console.log("Button clicked!");
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
