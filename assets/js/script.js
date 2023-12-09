today = dayjs().format("MMMM D, YYYY");
calendar = $("#calendar");

$("#currentDay").text(today);

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

function createCalendar() {
  //loop through hours array and create corresponding elements
  for (let i = 0; i < hours.length; i++) {
    const element = hours[i];
    row = $("<div>").addClass("row");
    //create time column
    // TODO: Put time text in a paragaph

    timeDiv = $("<div>").addClass("col-1 hour");
    time = $("<p>").addClass("time-block mt-3");
    time.text(findHour(hours[i]));
    timeDiv.append(time);

    //create task input column
    taskDiv = $("<div>").addClass("col-10 p-0");
    taskDiv.addClass(isPassed(hours[i]));
    task = $("<textarea>");
    //if time has passed then

    taskDiv.append(task);

    //create save button
    saveBtnDiv = $("<div>").addClass("col-1 d-flex p-0");
    saveBtn = $("<button>").addClass("saveBtn");
    saveBtnIcon = $("<i>").addClass("bi bi-floppy2-fill px-4");
    saveBtn.append(saveBtnIcon);
    saveBtnDiv.append(saveBtn);

    row.append(timeDiv);
    row.append(taskDiv);
    row.append(saveBtnDiv);
    calendar.append(row);
  }
}

//if time has passed, change background color to gret
function isPassed(currentHour) {
  if (dayjs().format("H") > currentHour) {
    return "past";
  } else if (dayjs().format("H") == currentHour) {
    return "present";
  } else {
    return "future";
  }
}

function findHour(hour) {
  if (hour == 12) {
    return `${12}PM`;
  } else if (hour > 12) {
    return `${hour - 12}PM`;
  }
  return hour;
}

createCalendar();
