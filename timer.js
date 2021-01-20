class CountdownTimer {
  constructor() {
    this.selector = '#timer-1';
    this.targetDate = new Date(2021, 5, 22, 9, 0, 0);
  }
}
const timerGenerated = new CountdownTimer();

const dedline = timerGenerated.targetDate;
const timeToday = new Date();

let timerSet = null;
const daysSelector = document.querySelector('span[data-value="days"]');
const hoursSelector = document.querySelector('span[data-value="hours"]');
const minutesSelector = document.querySelector('span[data-value="mins"]');
const secondsSelector = document.querySelector('span[data-value="secs"]');

const time = dedline.getTime() - timeToday.getTime();

let days = Math.floor(time / (1000 * 60 * 60 * 24));
daysSelector.textContent = days;

let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
hoursSelector.textContent = hours;

let mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
minutesSelector.textContent = mins;

let secs = Math.floor((time % (1000 * 60)) / 1000);
secondsSelector.textContent = secs;

stylesOfNumbers(secs, secondsSelector);
stylesOfNumbers(mins, minutesSelector);
stylesOfNumbers(hours, hoursSelector);
stylesOfNumbers(days, daysSelector);

function stylesOfNumbers(value, selector) {
  if (value < 10) {
    let previousNumber = selector.textContent;
    selector.textContent = '';
    selector.insertAdjacentHTML(
      'afterbegin',
      `<span class="number-styles">0</span><span class="number-styles">${value}</span>`,
    );
    if (previousNumber !== selector.textContent[1]) {
      selector.classList.toggle('rotate');
      selector.classList.toggle('rotate-back');
    }
  } else if (value >= 10 && value <= 99) {
    let previousNumber = selector.textContent;
    selector.textContent = '';
    selector.insertAdjacentHTML(
      'afterbegin',
      '<span class="number-styles">' +
        `${value}`[0] +
        '</span>' +
        '<span class="number-styles rotate">' +
        `${value}`[1] +
        '</span>',
    );
    if (previousNumber !== selector.textContent) {
      selector.classList.toggle('rotate');
      selector.classList.toggle('rotate-back');
    }
  } else if (value > 99) {
    let previousNumber = selector.textContent;

    selector.textContent = '';
    selector.insertAdjacentHTML(
      'afterbegin',
      '<span class="number-styles">' +
        `${value}`[0] +
        '</span>' +
        '<span class="number-styles">' +
        `${value}`[1] +
        '</span>' +
        '<span class="number-styles">' +
        `${value}`[2] +
        '</span>',
    );
    if (previousNumber !== selector.textContent) {
      selector.classList.toggle('rotate');
      selector.classList.toggle('rotate-back');
    }
  }
}

if (time < 0) {
  secs = 0;
  mins = 0;
  hours = 0;
  days = 0;
  stylesOfNumbers(days, daysSelector);
  stylesOfNumbers(secs, secondsSelector);
  stylesOfNumbers(mins, minutesSelector);
  stylesOfNumbers(hours, hoursSelector);
}

timerSet = setInterval(tickTuck, 1000);

function tickTuck() {
  if (secs !== 0) {
    secs -= 1;
    stylesOfNumbers(secs, secondsSelector);
  } else {
    secs = 59;
    stylesOfNumbers(secs, secondsSelector);

    if (mins !== 0) {
      mins -= 1;
      stylesOfNumbers(mins, minutesSelector);
    } else {
      mins = 59;
      stylesOfNumbers(mins, minutesSelector);
      if (hours !== 0) {
        hours -= 1;
        stylesOfNumbers(hours, hoursSelector);
      } else {
        hours = 23;
        stylesOfNumbers(hours, hoursSelector);
        if (days !== 0) {
          days -= 1;
          stylesOfNumbers(days, daysSelector);
        } else {
          secs = 0;
          mins = 0;
          hours = 0;
          stylesOfNumbers(secs, secondsSelector);
          stylesOfNumbers(mins, minutesSelector);
          stylesOfNumbers(hours, hoursSelector);

          clearInterval(timerSet);
        }
      }
    }
  }
}
