import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
//variables for timer
let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};
flatpickr(datePicker, options);

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datePicker.disabled = true;
  // starts interval each second
  intervalId = setInterval(() => {
    const now = new Date();
    const difference = userSelectedDate - now;

    if (difference <= 0) {
      clearInterval(intervalId); //stops timer
      updateTimerUI(0); //updates timer
      datePicker.disabled = false; //enables datepicker
      iziToast.success({
        title: 'Completed',
        message: 'Countdown finished', //message
      });
      return;
    }
    updateTimerUI(difference); //else updates timer if difference is more than 0
  }, 1000);
});
// converts ms to days, hours, minutes, seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
//adds leading zero to numbers
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
//function to update timer UI
function updateTimerUI(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}
