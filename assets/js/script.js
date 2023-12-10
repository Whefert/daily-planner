dayjs.extend(window.dayjs_plugin_advancedFormat);
today = dayjs().format("dddd, MMMM Do");

calendar = $("#calendar");
tasks = $("#currentDay").text(today);
taskArray = [];

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

function createCalendar() {
  //loop through the hours array and create corresponding elements
  for (let i = 0; i < hours.length; i++) {
    const element = hours[i];
    row = $("<div>").addClass("row");

    //create time column
    timeDiv = $("<div>").addClass("col-1 hour");
    time = $("<p>").addClass("time-block mt-3");
    time.text(findHour(hours[i]));
    timeDiv.append(time);

    //create task input column
    taskDiv = $("<div>").addClass("col-10 p-0");
    taskDiv.addClass(isPassed(hours[i]));
    task = $("<textarea>");
    task.addClass("w-100");
    task.attr("data-hour", `${hours[i]}`);
    taskDiv.append(task);

    //create save button
    saveBtnDiv = $("<div>").addClass("col-1 d-flex p-0");
    saveBtn = $("<button>").addClass("saveBtn");
    saveBtnIcon = $("<i>").addClass("bi bi-floppy2-fill px-4");
    saveBtnIcon.attr("data-hour", `${hours[i]}`);
    saveBtn.attr("data-hour", `${hours[i]}`);
    saveBtn.append(saveBtnIcon);
    saveBtnDiv.append(saveBtn);

    row.append(timeDiv);
    row.append(taskDiv);
    row.append(saveBtnDiv);
    calendar.append(row);
  }
}

//if time has passed, if it is in the present or future, add the corresponding css
function isPassed(currentHour) {
  if (dayjs().format("H") > currentHour) {
    return "past";
  } else if (dayjs().format("H") == currentHour) {
    return "present";
  } else {
    return "future";
  }
}

//calculate the hour based on a 12 hour clock and return the current hour
function findHour(hour) {
  if (hour == 12) {
    return `${12}PM`;
  } else if (hour > 12) {
    return `${hour - 12}PM`;
  }
  return `${hour}AM`;
}

//populate rows with existing data in local storage
function populateCalendar() {
  //for each item in local storage try to find which hour it is associated with
  for (let i = 0; i < hours.length; i++) {
    let task = localStorage.getItem(`task-${hours[i]}`);
    if (task != null) {
      task = JSON.parse(task);
      taskArray.push(task);
    }
  }
  //find hour for each task and the corresponding text area
  taskArray.forEach((task) => {
    $(`textarea[data-hour = ${task.hour}]`).val(task.task);
  });
}

createCalendar();
populateCalendar();
//add listener to all save buttons
$("button").on("click", (e) => {
  //find hour for the row of the clicked button/icon
  hourToSave = e.target.getAttribute("data-hour");
  //save value of the selected textarea
  textToSave = $(`textarea[data-hour = ${hourToSave}]`).val().trim();
  //save the input text to local storage
  localStorage.setItem(
    `task-${hourToSave}`,
    JSON.stringify({ hour: hourToSave, task: textToSave })
  );
});
