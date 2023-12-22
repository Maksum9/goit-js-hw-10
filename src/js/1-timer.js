import flatpickr from "flatpickr/dist/flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr/dist/flatpickr.min.js";
import "izitoast/dist/css/iziToast.min.css";
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();
  
      if (selectedDate <= currentDate) {
        document.querySelector('[data-start]').disabled = true;
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
        });
      } else {
        document.querySelector('[data-start]').disabled = false;
      }
    },
  };
  
  flatpickr("#datetime-picker", options);
  
  document.querySelector('[data-start]').addEventListener('click', startTimer);
  
  let countdownInterval;
  
  function startTimer() {
    const selectedDate = new Date(document.querySelector('#datetime-picker').value);
    const currentDate = new Date();
  
    if (selectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      return;
    }
  
    document.querySelector('[data-start]').disabled = true;
  
    countdownInterval = setInterval(updateTimer, 1000);
    updateTimer();
  }
  
  function updateTimer() {
    const selectedDate = new Date(document.querySelector('#datetime-picker').value);
    const currentDate = new Date();
    const timeDifference = selectedDate - currentDate;
  
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      displayTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success({
        title: 'Finished',
        message: 'Countdown timer has ended!',
      });
    } else {
      const timeValues = convertMs(timeDifference);
      displayTime(timeValues);
    }
  }
  
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
  
  function displayTime({ days, hours, minutes, seconds }) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }
  
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
  