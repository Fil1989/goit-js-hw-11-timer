class CountdownTimer {
  constructor() {
    this.selector = '#timer-1';
    this.targetDate = new Date(2021, 4, 1, 19, 22, 0);
  }
}
const timerGenerated = new CountdownTimer();

const dedline = timerGenerated.targetDate;
const timeToday = new Date();

let timerSet = null;
const daysSelector = document.querySelector('div[data-value="days"]');
const hoursSelector = document.querySelector('div[data-value="hours"]');
const minutesSelector = document.querySelector('div[data-value="mins"]');
const secondsSelector = document.querySelector('div[data-value="secs"]');

const time = dedline.getTime() - timeToday.getTime();

let days = Math.floor(time / (1000 * 60 * 60 * 24));
daysSelector.querySelector('.value-first').textContent[0] = `${days}`[0];
daysSelector.querySelector('.value-second').textContent[1] = `${days}`[1];
if (`${days}`.length > 2) {
  daysSelector.querySelector('.value-third').textContent[2] = `${days}`[2];
} else {
  daysSelector.querySelector('.value-third').remove();
}

let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
hoursSelector.querySelector('.value-first').textContent[0] = `${hours}`[0];
hoursSelector.querySelector('.value-second').textContent[1] = `${hours}`[1];

let mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
minutesSelector.querySelector('.value-first').textContent[0] = `${mins}`[0];
minutesSelector.querySelector('.value-second').textContent[1] = `${mins}`[1];

let secs = Math.floor((time % (1000 * 60)) / 1000);
secondsSelector.querySelector('.value-first').textContent[0] = `${secs}`[0];
secondsSelector.querySelector('.value-second').textContent[1] = `${secs}`[1];

stylesOfNumbers(secs, secondsSelector);
stylesOfNumbers(mins, minutesSelector);
stylesOfNumbers(hours, hoursSelector);
stylesOfNumbers(days, daysSelector);

function stylesOfNumbers(value, selector) {
  if (value < 10) {
    let previousNumberFirst = selector.querySelector('.value-first')
      .textContent;

    let previousNumberSecond = selector.querySelector('.value-second')
      .textContent;
    selector.querySelector('.value-first').textContent = '';
    selector.querySelector('.value-second').textContent = '';
    selector
      .querySelector('.value-first')
      .insertAdjacentHTML('afterbegin', '0');
    selector
      .querySelector('.value-second')
      .insertAdjacentHTML('afterbegin', `${value}`);
    if (
      previousNumberFirst !== selector.querySelector('.value-first').textContent
    ) {
      selector.querySelector('.value-first').classList.toggle('rotate');
      selector.querySelector('.value-first').classList.toggle('rotate-back');
    }
    if (
      previousNumberSecond !==
      selector.querySelector('.value-second').textContent
    ) {
      selector.querySelector('.value-second').classList.toggle('rotate');
      selector.querySelector('.value-second').classList.toggle('rotate-back');
    }
  } else if (value >= 10 && value <= 99) {
    let previousNumberFirst = selector.querySelector('.value-first')
      .textContent;

    let previousNumberSecond = selector.querySelector('.value-second')
      .textContent;
    selector.querySelector('.value-first').textContent = '';
    selector.querySelector('.value-second').textContent = '';
    selector
      .querySelector('.value-first')
      .insertAdjacentHTML('afterbegin', `${value}`[0]);
    selector
      .querySelector('.value-second')
      .insertAdjacentHTML('afterbegin', `${value}`[1]);
    if (value === 99) {
      selector.querySelector('.value-third').remove();
    }
    if (
      previousNumberFirst !== selector.querySelector('.value-first').textContent
    ) {
      selector.querySelector('.value-first').classList.toggle('rotate');
      selector.querySelector('.value-first').classList.toggle('rotate-back');
    }
    if (
      previousNumberSecond !==
      selector.querySelector('.value-second').textContent
    ) {
      selector.querySelector('.value-second').classList.toggle('rotate');
      selector.querySelector('.value-second').classList.toggle('rotate-back');

      // if (value % 2 === 0) {
      //   selector.querySelector('.value-second').classList.remove('rotate');
      //   selector.querySelector('.value-second').classList.add('rotate-back');
      // } else {
      //   selector.querySelector('.value-second').classList.remove('rotate-back');
      //   selector.querySelector('.value-second').classList.add('rotate');
      // }
    }
  } else if (value > 99) {
    let previousNumberFirst = selector.querySelector('.value-first')
      .textContent;

    let previousNumberSecond = selector.querySelector('.value-second')
      .textContent;
    let previousNumberThird = selector.querySelector('.value-third')
      .textContent;
    selector.querySelector('.value-first').textContent = '';
    selector.querySelector('.value-second').textContent = '';
    selector.querySelector('.value-third').textContent = '';
    selector
      .querySelector('.value-first')
      .insertAdjacentHTML('afterbegin', `${value}`[0]);
    selector
      .querySelector('.value-second')
      .insertAdjacentHTML('afterbegin', `${value}`[1]);
    selector
      .querySelector('.value-third')
      .insertAdjacentHTML('afterbegin', `${value}`[2]);
    if (value === 99) {
      selector.querySelector('.value-third').remove();
    }
    if (
      previousNumberFirst !== selector.querySelector('.value-first').textContent
    ) {
      selector.querySelector('.value-first').classList.toggle('rotate');
      selector.querySelector('.value-first').classList.toggle('rotate-back');
    }
    if (
      previousNumberSecond !==
      selector.querySelector('.value-second').textContent
    ) {
      selector.querySelector('.value-second').classList.toggle('rotate');
      selector.querySelector('.value-second').classList.toggle('rotate-back');
    }
    if (
      previousNumberThird !== selector.querySelector('.value-third').textContent
    ) {
      selector.querySelector('.value-third').classList.toggle('rotate');
      selector.querySelector('.value-third').classList.toggle('rotate-back');
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
