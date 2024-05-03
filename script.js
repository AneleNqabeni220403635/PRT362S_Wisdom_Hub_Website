const daysContainer = document.querySelector(".days");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const month = document.querySelector(".month");
const todayBtn = document.querySelector(".today-btn");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// get current date
const date = new Date();

// get current month
let currentMonth = date.getMonth();

// get current year
let currentYear = date.getFullYear();

// function to render days
function renderCalendar() {
  // get prev month current month and next month days
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  // update current year and month in header
  if (month) {
    month.innerHTML = `${months[currentMonth]} ${currentYear}`;
  }

  // update days html
  let calendarDays = "";

  // prev days html
  for (let x = firstDay.getDay(); x > 0; x--) {
    calendarDays += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  // current month days
  for (let i = 1; i <= lastDayDate; i++) {
    // check if it's today then add today class
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      // if date month year matches add today
      calendarDays += `<div class="day today">${i}</div>`;
    } else {
      // else don't add today
      calendarDays += `<div class="day ">${i}</div>`;
    }
  }

  // next Month days
  for (let j = 1; j <= nextDays; j++) {
    calendarDays += `<div class="day next">${j}</div>`;
  }

  // run this function with every calendar render
  hideTodayBtn();
  if (daysContainer) {
    daysContainer.innerHTML = calendarDays;
  }
}

renderCalendar();

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    // increase current month by one
    currentMonth++;
    if (currentMonth > 11) {
      // if month gets greater than 11 make it 0 and increase year by one
      currentMonth = 0;
      currentYear++;
    }
    // re-render calendar
    renderCalendar();
  });
}

// prev month btn
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    // decrease by one
    currentMonth--;
    // check if less than 0 then make it 11 and decrease year
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });
}

// go to today
if (todayBtn) {
  todayBtn.addEventListener("click", () => {
    // set month and year to current
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    // re-render calendar
    renderCalendar();
  });
}

// let's hide today btn if it's already the current month and vice versa
function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    if (todayBtn) {
      todayBtn.style.display = "none";
    }
  } else {
    if (todayBtn) {
      todayBtn.style.display = "flex";
    }
  }
}
